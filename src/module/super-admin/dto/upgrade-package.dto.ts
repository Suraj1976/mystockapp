import { IsString } from 'class-validator';

export class UpgradePackageDto {
  @IsString()
  newPackageId: string;
}