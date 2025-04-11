import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerService } from './logging/logger.service';

@Module({
  providers: [ConfigService, LoggerService],
  exports: [ConfigService],
})
export class ConfigModule {}