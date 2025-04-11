import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RateLimitService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: '127.0.0.1',
      port: 6380,
    });
  }

  async checkRateLimit(key: string, limit: number, ttl: number): Promise<boolean> {
    const redisKey = `rate-limit:${key}`;

    const pipeline = this.redis.pipeline();
    pipeline.incr(redisKey);
    pipeline.ttl(redisKey);

    const results = await pipeline.exec();
    const totalHits = Number(results[0][1]); // totalHits को number में कास्ट करें
    let timeToExpire = Number(results[1][1]); // timeToExpire को number में कास्ट करें

    if (timeToExpire === -1) {
      await this.redis.expire(redisKey, ttl);
      timeToExpire = ttl;
    }

    if (totalHits > limit) {
      return false; // रेट लिमिट पार हो गया
    }

    return true; // रेट लिमिट के अंदर है
  }
}