import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService extends Logger {
  private logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console(),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
    super.log(message, context);
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
    super.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
    super.warn(message, context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
    super.debug(message, context);
  }
}