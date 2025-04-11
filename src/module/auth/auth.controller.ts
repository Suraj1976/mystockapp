import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-super-admin')
  async registerSuperAdmin(@Body() body: { email: string; password: string }) {
    return this.authService.registerSuperAdmin(body.email, body.password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(@Body() body: { email: string; oldPassword: string; newPassword: string }) {
    return this.authService.changePassword(body.email, body.oldPassword, body.newPassword);
  }

  @Post('request-otp')
  async requestOtp(@Body() body: { email: string }) {
    return this.authService.requestOtp(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; otp: string; newPassword: string }) {
    return this.authService.resetPassword(body.email, body.otp, body.newPassword);
  }

  @Get('sso')
  @UseGuards(AuthGuard('saml'))
  async sso() {
    // SAML रीडायरेक्ट हैंडल करेगा
  }

  @Post('sso/callback')
  @UseGuards(AuthGuard('saml'))
  async ssoCallback(@Request() req) {
    return this.authService.generateJwtForSso(req.user);
  }
}