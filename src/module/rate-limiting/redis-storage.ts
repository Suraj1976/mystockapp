import { ThrottlerStorage } from '@nestjs/throttler';
import { Redis } from 'ioredis';

export interface ThrottlerRecord {
  totalHits: number;
  timeToExpire: number;
  blockDuration: number;
  isBlocked: boolean;
  timeToBlockExpire: number;
}

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
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<ThrottlerRecord> {
    const redisKey = `throttle:${throttlerName}:${key}`;
    const blockKey = `block:${throttlerName}:${key}`;

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
        await this.redis.expire(redisKey, ttl);
        timeToExpire = ttl;
      }

      if (totalHits > limit && !isBlocked) {
        await this.redis.set(blockKey, '1', 'EX', blockDuration);
        timeToBlockExpire = blockDuration;
        return {
          totalHits,
          timeToExpire,
          blockDuration,
          isBlocked: true,
          timeToBlockExpire,
        };
      }

      return {
        totalHits,
        timeToExpire,
        blockDuration: isBlocked ? timeToBlockExpire : 0,
        isBlocked,
        timeToBlockExpire: isBlocked ? timeToBlockExpire : 0,
      };
    } catch (error) {
      console.error('Error in Redis increment:', error);
      return {
        totalHits: 0,
        timeToExpire: ttl,
        blockDuration: 0,
        isBlocked: false,
        timeToBlockExpire: 0,
      }; // डिफ़ॉल्ट रिकॉर्ड लौटाएँ
    }
  }

  async getRecord(_key: string): Promise<number[]> {
    return [];
  }

  async addRecord(_key: string, _ttl: number): Promise<void> {
    // वैकल्पिक
  }
}