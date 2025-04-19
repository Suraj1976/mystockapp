import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';
export declare class AuditLogsService {
    private auditLogModel;
    constructor(auditLogModel: Model<AuditLogDocument>);
    logAction(userId: string, action: string, data: any): Promise<import("mongoose").Document<unknown, {}, AuditLogDocument> & AuditLog & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(tenantId: string): Promise<(import("mongoose").Document<unknown, {}, AuditLogDocument> & AuditLog & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
