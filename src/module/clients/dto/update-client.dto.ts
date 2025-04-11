import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateClientDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  @IsOptional()
  phone?: string;

  @IsString({ message: 'Company must be a string' })
  @IsOptional()
  company?: string;
}