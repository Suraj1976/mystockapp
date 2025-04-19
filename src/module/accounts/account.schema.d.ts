import { Document, Types } from 'mongoose';
export type AccountDocument = Account & Document;
export declare class Account {
    packageId: Types.ObjectId;
    companyId: Types.ObjectId;
    clientId: Types.ObjectId;
    createdAt: Date;
}
export declare const AccountSchema: import("mongoose").Schema<Account, import("mongoose").Model<Account, any, any, any, Document<unknown, any, Account> & Account & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Account, Document<unknown, {}, import("mongoose").FlatRecord<Account>> & import("mongoose").FlatRecord<Account> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
