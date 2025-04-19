"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RateLimitService = class RateLimitService {
    constructor() {
        this.redis = new ioredis_1.Redis({
            host: '127.0.0.1',
            port: 6380,
        });
    }
    async checkRateLimit(key, limit, ttl) {
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
};
exports.RateLimitService = RateLimitService;
exports.RateLimitService = RateLimitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RateLimitService);
