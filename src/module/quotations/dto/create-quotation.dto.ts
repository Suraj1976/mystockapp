// src/modules/quotations/dto/create-quotation.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuotationDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}