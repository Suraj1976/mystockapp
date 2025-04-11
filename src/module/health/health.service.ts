import { Injectable } from '@nestjs/common';
import { DatabaseMonitor } from './monitors/database.monitor';
import { HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(private databaseMonitor: DatabaseMonitor) {}

  async check(): Promise<HealthIndicatorResult> {
    return this.databaseMonitor.checkDatabase();
  }
}