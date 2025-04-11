import { Controller, Get, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user-role.enum';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SALES)
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get('dashboard')
  getDashboard() {
    return this.salesService.getDashboard();
  }
}