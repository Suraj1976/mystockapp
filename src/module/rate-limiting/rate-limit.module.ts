import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitService } from './rate-limit.service';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { RedisStorage } from '../../redis-storage';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 100,
        },
      ],
      storage: new RedisStorage({
        host: 'localhost',
        port: 6380,
      }),
    }),
  ],
  providers: [RateLimitService, RateLimitGuard],
  exports: [RateLimitGuard],
})
export class RateLimitingModule {}