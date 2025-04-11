import { IsEmail, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../user-role.enum'; // सही पथ

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  companyId?: string;
}