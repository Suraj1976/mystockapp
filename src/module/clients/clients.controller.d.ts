import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
export declare class ClientsController {
    private clientsService;
    constructor(clientsService: ClientsService);
    create(req: any, createClientDto: CreateClientDto): Promise<import("./client.schema").Client>;
    getMyClients(req: any): Promise<import("./client.schema").ClientDocument[]>;
    selfRenew(req: any, renewClientDto: {
        expiryDate: string;
    }): Promise<import("./client.schema").Client>;
    update(req: any, id: string, updateData: any): Promise<import("./client.schema").Client>;
    delete(req: any, id: string): Promise<any>;
}
