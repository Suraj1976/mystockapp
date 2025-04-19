import { Model } from 'mongoose';
import { Client, ClientDocument } from './client.schema';
import { CompaniesService } from '../companies/companies.service';
import { CreateClientDto } from './dto/create-client.dto';
export declare class ClientsService {
    private clientModel;
    private readonly companiesService;
    constructor(clientModel: Model<ClientDocument>, companiesService: CompaniesService);
    create(createClientDto: CreateClientDto, createdBy: string, tenantId: string): Promise<Client>;
    findById(id: string): Promise<ClientDocument>;
    findByCreator(userId: string): Promise<ClientDocument[]>;
    findAll(): Promise<ClientDocument[]>;
    findAllByTenantId(tenantId: string): Promise<ClientDocument[]>;
    update(id: string, userId: string, updateData: any): Promise<Client>;
    delete(id: string, userId: string): Promise<any>;
    selfRenew(userId: string, renewClientDto: {
        expiryDate: string;
    }): Promise<Client>;
}
