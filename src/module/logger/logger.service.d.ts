import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    private logger;
    constructor();
    log(message: string, context?: string): void;
    error(message: string, trace: string, context?: string): void;
    warn(message: string, context?: string): void;
    debug(message: string, context?: string): void;
}
