import { ThrottlerStorage } from '@nestjs/throttler';
import Redis from 'ioredis';

export class RedisStorage implements ThrottlerStorage {
  private readonly redis: Redis;
  private readonly ttl: number;

  constructor(options: { host: string; port: number; ttl: number }) {
    this.redis = new Redis({
      host: options.host,
      port: options.port,
      retryStrategy: (times) => {
        console.error(`Redis connection failed, retrying (${times})...`);
        return Math.min(times * 100, 2000); // रिट्री के बीच देरी
      },
    });
    this.ttl = options.ttl;

    this.redis.on('error', (err) => {
      console.error('Redis error:', err.message);
    });
  }

  async increment(
    key: string,
    ttl: number,
  ): Promise<{ totalHits: number; timeToExpire: number; isBlocked: boolean; timeToBlockExpire: number }> {
    const redisKey = `throttle:${key}`;
    const blockKey = `block:${key}`; // ब्लॉकिंग के लिए अलग कुंजी

    try {
      const pipeline = this.redis.pipeline();
      pipeline.incr(redisKey);
      pipeline.ttl(redisKey);
      pipeline.exists(blockKey);
      pipeline.ttl(blockKey);

      const results = await pipeline.exec();

      if (!results) throw new Error('Redis pipeline failed');

      const totalHits = Number(results[0][1]);
      let timeToExpire = Number(results[1][1]);
      const isBlocked = Boolean(results[2][1]);
      let timeToBlockExpire = Number(results[3][1]);

      if (timeToExpire === -1) {
        await this.redis.expire(redisKey, ttl / 1000); // ttl को सेकंड में कन्वर्ट करें
        timeToExpire = ttl;
      }

      if (timeToBlockExpire === -1) {
        timeToBlockExpire = 0; // अगर ब्लॉक कुंजी की समय-सीमा नहीं है, तो 0 सेट करें
      }

      return {
        totalHits,
        timeToExpire,
        isBlocked,
        timeToBlockExpire,
      };
    } catch (error) {
      console.error('Error in Redis increment:', error);
      return {
        totalHits: 0,
        timeToExpire: ttl,
        isBlocked: false,
        timeToBlockExpire: 0,
      };
    }
  }

  async getRecord(key: string): Promise<number[]> {
    const redisKey = `throttle:${key}`;
    const records = await this.redis.lrange(redisKey, 0, -1);
    return records.map(Number);
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    const redisKey = `throttle:${key}`;
    const now = Date.now();
    await this.redis.rpush(redisKey, now.toString());
    await this.redis.expire(redisKey, ttl / 1000);
  }
}