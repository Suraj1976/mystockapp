import { ConfigService } from '../config.service';
export declare class LoggerService {
    private configService;
    constructor(configService: ConfigService);
    log(message: string): void;
}
