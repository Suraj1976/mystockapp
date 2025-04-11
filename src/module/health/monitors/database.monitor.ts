import { Injectable } from '@nestjs/common';
import { MongooseHealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class DatabaseMonitor {
  constructor(private mongooseHealth: MongooseHealthIndicator) {}

  async checkDatabase(): Promise<HealthIndicatorResult> {
    return this.mongooseHealth.pingCheck('mongodb');
  }
}