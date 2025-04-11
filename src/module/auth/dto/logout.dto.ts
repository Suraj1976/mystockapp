import { IsString } from 'class-validator';

export class LogoutDto {
  @IsString({ message: 'Refresh token must be a string' })
  refresh_token: string;
}