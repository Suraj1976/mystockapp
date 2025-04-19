import { ThrottlerGuard as NestThrottlerGuard } from '@nestjs/throttler';
export declare class ThrottlerGuard extends NestThrottlerGuard {
    protected getLimit(): number;
    protected getTtl(): number;
}
