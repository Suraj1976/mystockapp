import { IsString, IsNotEmpty, IsEmail, IsMongoId } from 'class-validator';

export class CreateAccountDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Company must be a string' })
  @IsNotEmpty({ message: 'Company is required' })
  company: string;

  @IsMongoId({ message: 'Package must be a valid MongoDB ID' })
  @IsNotEmpty({ message: 'Package is required' })
  package: string;
}