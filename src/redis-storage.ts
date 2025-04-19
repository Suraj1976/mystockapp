import { ThrottlerStorage } from '@nestjs/throttler';
import Redis from 'ioredis';

// Define the interface for ThrottlerStorageRecord
export interface ThrottlerStorageRecord {
  totalHits: number;
  timeToExpire: number;
  isBlocked: boolean;
  timeToBlockExpire: number;
}

// Define options interface for RedisStorage
interface RedisStorageOptions {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

export class RedisStorage implements ThrottlerStorage {
  private readonly redis: Redis;

  constructor(options: RedisStorageOptions) {
    this.redis = new Redis({
      host: options.host,
      port: options.port,
      password: options.password,
      db: options.db || 0,
    });

    this.redis.on('error', (err) => {
      console.error('Redis connection error:', err.message);
    });
  }

  async increment(key: string, ttl: number): Promise<ThrottlerStorageRecord> {
    try {
      const redisKey = `throttle:${key}`;
      const blockKey = `block:${key}`;

      const pipeline = this.redis.pipeline();
      pipeline.incr(redisKey); // Increment hit count
      pipeline.ttl(redisKey); // Get TTL of the key
      pipeline.exists(blockKey); // Check if the key is blocked
      pipeline.ttl(blockKey); // Get TTL of the block key

      const results = await pipeline.exec();

      // Handle pipeline results with type safety
      const totalHits = Number(results?.[0]?.[1] ?? 0);
      let timeToExpire = Number(results?.[1]?.[1] ?? ttl);
      const isBlocked = Boolean(results?.[2]?.[1] ?? false);
      let timeToBlockExpire = Number(results?.[3]?.[1] ?? 0);

      // If TTL is not set (-1), set it to the provided ttl
      if (timeToExpire === -1) {
        await this.redis.expire(redisKey, ttl);
        timeToExpire = ttl;
      }

      // If block TTL is not set (-1), set it to 0
      if (timeToBlockExpire === -1) {
        timeToBlockExpire = 0;
      }

      return {
        totalHits,
        timeToExpire,
        isBlocked,
        timeToBlockExpire,
      };
    } catch (error: unknown) {
      console.error('Error in RedisStorage.increment:', error);
      throw new Error('Failed to increment throttle record in Redis');
    }
  }

  // Method to clean up Redis connection
  async destroy(): Promise<void> {
    try {
      await this.redis.quit();
      console.log('Redis connection closed');
    } catch (error: unknown) {
      console.error('Error closing Redis connection:', error);
    }
  }
}