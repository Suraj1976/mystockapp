import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

@Injectable()
export class AuditLogsService {
  constructor(@InjectModel(AuditLog.name) private auditLogModel: Model<AuditLogDocument>) {}

  async logAction(userId: string, action: string, data: any) {
    const log = new this.auditLogModel({
      userId,
      action,
      data,
      timestamp: new Date(),
    });
    return log.save();
  }

  async findAll(tenantId: string) {
    return this.auditLogModel.find({ tenantId }).exec();
  }
}