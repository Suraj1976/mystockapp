import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../module/logger/logger.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.verify(token);
        req.user = payload;
        this.loggerService.log(`User ${payload.email} authenticated via JWT`);
      } catch (error) {
        this.loggerService.log(`Invalid JWT token: ${error.message}`);
      }
    }
    next();
  }
}