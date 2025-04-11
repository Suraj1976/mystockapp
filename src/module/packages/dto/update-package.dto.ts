import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePackageDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;
}