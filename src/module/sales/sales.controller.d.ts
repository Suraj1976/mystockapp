import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    getClients(req: any): Promise<import("../clients/client.schema").ClientDocument[]>;
}
