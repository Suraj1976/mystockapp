import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../module/logger/logger.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded;
        next();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        this.loggerService.log(`Invalid JWT token: ${errorMessage}`);
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      this.loggerService.log('No JWT token provided');
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}