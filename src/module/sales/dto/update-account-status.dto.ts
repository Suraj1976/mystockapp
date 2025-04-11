import { IsEnum, IsNotEmpty } from 'class-validator';

enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdateAccountStatusDto {
  @IsEnum(AccountStatus)
  @IsNotEmpty()
  status: AccountStatus;
}