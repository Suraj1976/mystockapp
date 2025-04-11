import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';

@Injectable()
export class LoggerService {
  constructor(private configService: ConfigService) {}

  log(message: string) {
    if (this.configService.getLoggingEnabled()) {
      console.log(`[LOG] ${message}`);
    }
  }
}