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
exports.RbacGuard = void 0;
// src/guards/rbac.guard.ts
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let RbacGuard = class RbacGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredModule = this.reflector.get('module', context.getHandler());
        const requiredAction = this.reflector.get('action', context.getHandler());
        if (!requiredModule || !requiredAction) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.permissions || !user.permissions[requiredModule]) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        if (!user.permissions[requiredModule][requiredAction]) {
            throw new common_1.ForbiddenException(`No ${requiredAction} permission for ${requiredModule}`);
        }
        return true;
    }
};
exports.RbacGuard = RbacGuard;
exports.RbacGuard = RbacGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RbacGuard);
