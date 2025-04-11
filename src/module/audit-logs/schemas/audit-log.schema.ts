import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema()
export class AuditLog {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ type: mongoose.Schema.Types.Mixed }) // Mixed प्रकार का उपयोग
  data: any;

  @Prop({ required: true })
  userId: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);