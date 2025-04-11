import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  contactNo: string;

  @IsString()
  companyId: string;
}