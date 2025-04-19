import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string; isFirstLogin: boolean }> {
    return this.authService.login(loginDto);
  }

  @Post('register-super-admin')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registerSuperAdmin(@Body() body: { email: string; password: string }) {
    return this.authService.registerSuperAdmin(body.email, body.password);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changePassword(@Body() body: { email: string; oldPassword: string; newPassword: string }) {
    return this.authService.changePassword(body.email, body.oldPassword, body.newPassword);
  }
}