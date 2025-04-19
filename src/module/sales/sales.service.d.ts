import { Model } from 'mongoose';
import { ClientDocument } from '../clients/client.schema';
export declare class SalesService {
    private clientModel;
    constructor(clientModel: Model<ClientDocument>);
    getClients(userId: string): Promise<ClientDocument[]>;
}
