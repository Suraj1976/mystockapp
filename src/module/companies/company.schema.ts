import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  authorizedPerson: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, unique: true })
  email: string; // यहाँ email है

  @Prop({ required: true })
  contactNo: string;

  @Prop({ required: true })
  gstNo: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true, unique: true })
  licenseNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Package' })
  packageId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Company' }], default: [] })
  associatedCompanies: Types.ObjectId[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);