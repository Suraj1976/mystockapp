import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('COMPANY_ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-user')
  createUser(@Body() body: { email: string; role: string; companyId: string }) {
    return this.adminService.createUser(body.email, body.role, body.companyId);
  }

  @Get('dashboard')
  getDashboard(@Request() req) {
    return this.adminService.getDashboard(req.user);
  }
}