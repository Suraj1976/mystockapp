// src/module/manager/dto/create-manager.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateManagerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  companyId: string; // MongoDB ObjectId as string
}
