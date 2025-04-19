import { ThrottlerStorage } from '@nestjs/throttler';
export interface ThrottlerStorageRecord {
    totalHits: number;
    timeToExpire: number;
    isBlocked: boolean;
    timeToBlockExpire: number;
}
interface RedisStorageOptions {
    host: string;
    port: number;
    password?: string;
    db?: number;
}
export declare class RedisStorage implements ThrottlerStorage {
    private readonly redis;
    constructor(options: RedisStorageOptions);
    increment(key: string, ttl: number): Promise<ThrottlerStorageRecord>;
    destroy(): Promise<void>;
}
export {};
