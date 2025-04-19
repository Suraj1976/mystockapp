import { Controller, Post, Body, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDocument } from './account.schema';
import { Types } from 'mongoose';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(
    @Body() createAccountDto: { package: string; companyId: string; clientId: string },
  ): Promise<AccountDocument> {
    return this.accountsService.create(createAccountDto);
  }

  @Get('financial-summary')
  async getFinancialSummary(): Promise<{
    totalCompanies: number;
    totalClients: number;
    packages: Types.ObjectId[];
    summaries: { clientId: Types.ObjectId; package: any }[];
  }> {
    return this.accountsService.getFinancialSummary();
  }
}