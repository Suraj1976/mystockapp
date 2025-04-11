import { Injectable } from '@nestjs/common';
import { LoggerService } from './logging/logger.service';

@Injectable()
export class ConfigService {
  private loggingEnabled = true;

  constructor(private loggerService: LoggerService) {}

  getLoggingEnabled(): boolean {
    return this.loggingEnabled;
  }

  toggleLogging(enabled: boolean) {
    this.loggingEnabled = enabled;
    this.loggerService.log(`Logging toggled to ${enabled}`);
    return { loggingEnabled: enabled };
  }
}