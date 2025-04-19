export declare class CustomService {
    private services;
    addService(name: string, description: string): {
        name: string;
        description: string;
    }[];
    getServices(): {
        name: string;
        description: string;
    }[];
}
