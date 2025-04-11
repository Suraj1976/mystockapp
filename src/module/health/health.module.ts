import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseMonitor } from './monitors/database.monitor';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService, DatabaseMonitor],
})
export class HealthModule {}