import { IsEmail, IsString } from 'class-validator';

export class SetupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}