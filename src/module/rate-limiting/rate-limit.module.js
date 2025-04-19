"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitingModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const rate_limit_service_1 = require("./rate-limit.service");
const rate_limit_guard_1 = require("./guards/rate-limit.guard");
const redis_storage_1 = require("../../redis-storage");
let RateLimitingModule = class RateLimitingModule {
};
exports.RateLimitingModule = RateLimitingModule;
exports.RateLimitingModule = RateLimitingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60,
                        limit: 100,
                    },
                ],
                storage: new redis_storage_1.RedisStorage({
                    host: 'localhost',
                    port: 6380,
                }),
            }),
        ],
        providers: [rate_limit_service_1.RateLimitService, rate_limit_guard_1.RateLimitGuard],
        exports: [rate_limit_guard_1.RateLimitGuard],
    })
], RateLimitingModule);
