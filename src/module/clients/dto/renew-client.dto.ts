import { IsObject } from 'class-validator';

export class RenewClientDto {
  @IsObject()
  paymentDetails: any;
}