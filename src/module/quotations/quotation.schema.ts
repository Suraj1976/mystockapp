// src/modules/quotations/quotation.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Quotation extends Document {
  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  company: string;
}

export type QuotationDocument = Quotation & Document;
export const QuotationSchema = SchemaFactory.createForClass(Quotation);