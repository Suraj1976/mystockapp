import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('export')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_SUPER_ADMIN')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('users/:tenantId')
  async exportUsers(@Param('tenantId') tenantId: string) {
    return this.exportService.exportUsers(tenantId);
  }

  @Get('companies/:tenantId')
  async exportCompanies(@Param('tenantId') tenantId: string) {
    return this.exportService.exportCompanies(tenantId);
  }

  @Get('clients/:tenantId')
  async exportClients(@Param('tenantId') tenantId: string) {
    return this.exportService.exportClients(tenantId);
  }
}