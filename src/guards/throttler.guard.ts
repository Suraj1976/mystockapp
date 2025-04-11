import { Injectable } from '@nestjs/common';
import { ThrottlerGuard as NestThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottlerGuard extends NestThrottlerGuard {
  protected getLimit(): number {
    return 100; // 100 रिक्वेस्ट प्रति मिनट
  }

  protected getTtl(): number {
    return 60; // 60 सेकंड
  }
}