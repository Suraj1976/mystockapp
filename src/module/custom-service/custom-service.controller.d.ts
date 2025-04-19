import { CustomService } from './custom-service.service';
export declare class CustomServiceController {
    private readonly customService;
    constructor(customService: CustomService);
    addService(body: {
        name: string;
        description: string;
    }): {
        name: string;
        description: string;
    }[];
    getServices(): {
        name: string;
        description: string;
    }[];
}
