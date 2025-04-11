import { ConfigService } from '@nestjs/config';

export const getJwtSecret = (configService: ConfigService) => configService.get('JWT_SECRET');
export const getJwtRefreshSecret = (configService: ConfigService) => configService.get('JWT_REFRESH_SECRET');
export const OTP_SECRET = 'your_otp_secret_key';