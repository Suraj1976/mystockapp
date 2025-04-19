import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRole } from '../../enums/user-role.enum';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SALES_STAFF)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('clients')
  getClients(@Request() req) {
    return this.salesService.getClients(req.user.userId);
  }
}