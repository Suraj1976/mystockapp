import { MongooseHealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
export declare class DatabaseMonitor {
    private mongooseHealth;
    constructor(mongooseHealth: MongooseHealthIndicator);
    checkDatabase(): Promise<HealthIndicatorResult>;
}
