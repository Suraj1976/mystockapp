// src/module/admin/admin.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../enums/user-role.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_SUPER_ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  async createAdmin(@Body() body: { email: string; companyId: string }) {
    return this.adminService.createAdmin(body.email, body.companyId);
  }

  @Get(':userId')
  async getAdminDetails(@Param('userId') userId: string) {
    return this.adminService.getAdminDetails(userId);
  }
}