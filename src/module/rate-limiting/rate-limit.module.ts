import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitService } from './rate-limit.service';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { RedisStorage } from './redis-storage'; // सही पाथ सुनिश्चित करें

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: () => {
        return {
          throttlers: [
            {
              ttl: 60 * 1000, // मिलीसेकंड में
              limit: 100, // प्रति ttl में अनुरोधों की संख्या
            },
          ],
          storage: new RedisStorage({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
            ttl: 60 * 1000, // मिलीसेकंड में
          }),
        };
      },
    }),
  ],
  providers: [RateLimitService, RateLimitGuard],
  exports: [RateLimitGuard],
})
export class RateLimitingModule {}