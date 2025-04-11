import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CustomService } from './custom-service.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('custom-service')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_SUPER_ADMIN', 'COMPANY_ADMIN')
export class CustomServiceController {
  constructor(private readonly customService: CustomService) {}

  @Post('add')
  addService(@Body() body: { name: string; description: string }) {
    return this.customService.addService(body.name, body.description);
  }

  @Get()
  getServices() {
    return this.customService.getServices();
  }
}