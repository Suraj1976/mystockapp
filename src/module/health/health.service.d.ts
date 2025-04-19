import { DatabaseMonitor } from './monitors/database.monitor';
import { HealthIndicatorResult } from '@nestjs/terminus';
export declare class HealthService {
    private databaseMonitor;
    constructor(databaseMonitor: DatabaseMonitor);
    check(): Promise<HealthIndicatorResult>;
}
