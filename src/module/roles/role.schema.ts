import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  role: string;

  @Prop({ type: Object, default: {} })
  permissions: { [module: string]: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve?: boolean } };
}

export const RoleSchema = SchemaFactory.createForClass(Role);