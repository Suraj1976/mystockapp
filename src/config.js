"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_SECRET = exports.getJwtRefreshSecret = exports.getJwtSecret = void 0;
const getJwtSecret = (configService) => configService.get('JWT_SECRET');
exports.getJwtSecret = getJwtSecret;
const getJwtRefreshSecret = (configService) => configService.get('JWT_REFRESH_SECRET');
exports.getJwtRefreshSecret = getJwtRefreshSecret;
exports.OTP_SECRET = 'your_otp_secret_key';
