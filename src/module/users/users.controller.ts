import { Controller, Post, Body, Put, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../enums/user-role.enum';
import { Types } from 'mongoose';
import { UserDocument } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY_ADMIN, UserRole.SUPER_SUPER_ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.usersService.create(createUserDto);
    console.log(`User created with ID: ${user._id}`);
    return user;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY_ADMIN, UserRole.SUPER_SUPER_ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    // Clone the DTO
    const transformedData = { ...updateUserDto };

    // Convert companyId to ObjectId if needed
    if (transformedData.companyId && typeof transformedData.companyId === 'string') {
      transformedData.companyId = new Types.ObjectId(transformedData.companyId);
    }

    // Update user
    const updatedUser = await this.usersService.update(id, transformedData as any);
    console.log(`User updated with ID: ${id}`);
    return updatedUser;
  }

  @Post('reset-password-request')
  @HttpCode(HttpStatus.OK)
  async requestResetPassword(@Body() body: { email: string }): Promise<{ message: string }> {
    const result = await this.authService.requestOtp(body.email);
    console.log(`OTP requested for email: ${body.email}`);
    return result;
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() body: { email: string; otp: string; newPassword: string },
  ): Promise<UserDocument> {
    const user = await this.usersService.resetPassword(body.email, body.otp, body.newPassword);
    console.log(`Password reset for email: ${body.email}`);
    return user;
  }

  @Post('set-password')
  @HttpCode(HttpStatus.OK)
  async setPassword(
    @Body() body: { email: string; tempPassword: string; newPassword: string },
  ): Promise<UserDocument> {
    const user = await this.usersService.setInitialPassword(body.email, body.tempPassword, body.newPassword);
    console.log(`Initial password set for email: ${body.email}`);
    return user;
  }
}