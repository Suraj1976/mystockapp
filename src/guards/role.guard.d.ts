import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '../module/logger/logger.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private loggerService;
    constructor(reflector: Reflector, loggerService: LoggerService);
    canActivate(context: ExecutionContext): boolean;
}
