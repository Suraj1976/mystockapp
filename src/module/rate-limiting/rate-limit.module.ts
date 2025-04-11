import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisStorage } from './redis-storage';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // सेकंड में
          limit: 100, // प्रति ttl में अनुरोधों की संख्या
        },
      ],
      storage: new RedisStorage({
        host: '127.0.0.1',
        port: 6380,
        ttl: 60,
      }),
    }),
  ],
})
export class RateLimitingModule {}