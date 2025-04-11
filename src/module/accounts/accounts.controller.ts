import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_SUPER_ADMIN')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: any) {
    return this.accountsService.create(createAccountDto);
  }

  @Get('financial-summary')
  getFinancialSummary() {
    return this.accountsService.getFinancialSummary();
  }
}