// src/modules/roles/dto/update-role.dto.ts
import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  permissions?: {
    [module: string]: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
      approve?: boolean;
    };
  };
}