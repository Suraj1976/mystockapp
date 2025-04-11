// src/modules/quotations/dto/update-quotation.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateQuotationDto {
  @IsString()
  @IsOptional()
  clientId?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;
}