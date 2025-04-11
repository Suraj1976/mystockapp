import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RateLimitService } from '../rate-limit.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private readonly rateLimitService: RateLimitService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = request.ip; // IP के आधार पर रेट लिमिटिंग
    const limit = 100; // प्रति ttl में अनुरोधों की संख्या
    const ttl = 60; // सेकंड में

    return this.rateLimitService.checkRateLimit(key, limit, ttl);
  }
}