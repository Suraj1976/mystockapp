import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;

  @Prop()
  otp: string;

  @Prop()
  otpExpires: Date;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ default: true }) // पहली बार लॉगिन के लिए फ्लैग
  isFirstLogin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);