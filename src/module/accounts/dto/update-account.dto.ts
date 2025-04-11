import { IsString, IsOptional, IsEmail, IsMongoId } from 'class-validator';

export class UpdateAccountDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Company must be a string' })
  @IsOptional()
  company?: string;

  @IsMongoId({ message: 'Package must be a valid MongoDB ID' })
  @IsOptional()
  package?: string;
}