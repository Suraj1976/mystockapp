// src/modules/roles/dto/create-role.dto.ts
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  permissions: {
    [module: string]: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
      approve?: boolean;
    };
  };
}