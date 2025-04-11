// src/guards/rbac.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredModule = this.reflector.get<string>('module', context.getHandler());
    const requiredAction = this.reflector.get<string>('action', context.getHandler());
    if (!requiredModule || !requiredAction) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.permissions || !user.permissions[requiredModule]) {
      throw new ForbiddenException('Insufficient permissions');
    }

    if (!user.permissions[requiredModule][requiredAction]) {
      throw new ForbiddenException(`No ${requiredAction} permission for ${requiredModule}`);
    }

    return true;
  }
}