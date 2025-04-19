import { Document } from 'mongoose';
export type ClientDocument = Client & Document;
export declare class Client {
    name: string;
    email: string;
    companyId: string;
    tenantId: string;
    expiryDate: Date;
    createdBy: string;
    isActive: boolean;
}
export declare const ClientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, Document<unknown, any, Client> & Client & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, Document<unknown, {}, import("mongoose").FlatRecord<Client>> & import("mongoose").FlatRecord<Client> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
