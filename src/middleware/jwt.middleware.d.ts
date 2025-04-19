import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../module/logger/logger.service';
export declare class JwtMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly loggerService;
    constructor(jwtService: JwtService, loggerService: LoggerService);
    use(req: Request, res: Response, next: NextFunction): void;
}
