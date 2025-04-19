import { HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';
export declare class HealthController {
    private health;
    private healthService;
    constructor(health: HealthCheckService, healthService: HealthService);
    check(): Promise<HealthCheckResult>;
}
