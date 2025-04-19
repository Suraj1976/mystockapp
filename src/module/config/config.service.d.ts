import { LoggerService } from './logging/logger.service';
export declare class ConfigService {
    private loggerService;
    private loggingEnabled;
    constructor(loggerService: LoggerService);
    getLoggingEnabled(): boolean;
    toggleLogging(enabled: boolean): {
        loggingEnabled: boolean;
    };
}
