import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackageDocument = Package & Document;

@Schema()
export class Package {
  @Prop({ required: true })
  name: string; // name फील्ड required है

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  userLimit: number;

  @Prop({ type: [String], default: [] })
  features: string[];
}

export const PackageSchema = SchemaFactory.createForClass(Package);