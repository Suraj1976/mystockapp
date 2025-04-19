"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStorage = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisStorage {
    constructor(options) {
        this.redis = new ioredis_1.default({
            host: options.host,
            port: options.port,
            password: options.password,
            db: options.db || 0,
        });
        this.redis.on('error', (err) => {
            console.error('Redis connection error:', err.message);
        });
    }
    async increment(key, ttl) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
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
            const totalHits = Number((_b = (_a = results === null || results === void 0 ? void 0 : results[0]) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : 0);
            let timeToExpire = Number((_d = (_c = results === null || results === void 0 ? void 0 : results[1]) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : ttl);
            const isBlocked = Boolean((_f = (_e = results === null || results === void 0 ? void 0 : results[2]) === null || _e === void 0 ? void 0 : _e[1]) !== null && _f !== void 0 ? _f : false);
            let timeToBlockExpire = Number((_h = (_g = results === null || results === void 0 ? void 0 : results[3]) === null || _g === void 0 ? void 0 : _g[1]) !== null && _h !== void 0 ? _h : 0);
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
        }
        catch (error) {
            console.error('Error in RedisStorage.increment:', error);
            throw new Error('Failed to increment throttle record in Redis');
        }
    }
    // Method to clean up Redis connection
    async destroy() {
        try {
            await this.redis.quit();
            console.log('Redis connection closed');
        }
        catch (error) {
            console.error('Error closing Redis connection:', error);
        }
    }
}
exports.RedisStorage = RedisStorage;
