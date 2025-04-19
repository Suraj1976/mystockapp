export declare class RateLimitService {
    private readonly redis;
    constructor();
    checkRateLimit(key: string, limit: number, ttl: number): Promise<boolean>;
}
