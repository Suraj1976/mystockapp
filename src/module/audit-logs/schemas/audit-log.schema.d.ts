import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type AuditLogDocument = AuditLog & Document;
export declare class AuditLog {
    tenantId: string;
    action: string;
    timestamp: Date;
    data: any;
    userId: string;
}
export declare const AuditLogSchema: mongoose.Schema<AuditLog, mongoose.Model<AuditLog, any, any, any, Document<unknown, any, AuditLog> & AuditLog & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, AuditLog, Document<unknown, {}, mongoose.FlatRecord<AuditLog>> & mongoose.FlatRecord<AuditLog> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
