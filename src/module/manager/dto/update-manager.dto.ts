// src/module/manager/dto/update-manager.dto.ts
import { UserRole } from '../../../enums/user-role.enum';
import { Types } from 'mongoose';
import { IsOptional, IsEmail, IsString } from 'class-validator';

export class UpdateManagerDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  role?: UserRole.MANAGER;

  @IsOptional()
  @IsString()
  companyId?: string | Types.ObjectId;
}
