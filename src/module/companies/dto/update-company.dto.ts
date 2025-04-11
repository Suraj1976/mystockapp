import { IsString, IsOptional, IsEmail, IsMongoId } from 'class-validator';

export class UpdateCompanyDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Address must be a string' })
  @IsOptional()
  address?: string;

  @IsMongoId({ message: 'Package must be a valid MongoDB ID' })
  @IsOptional()
  package?: string;
}