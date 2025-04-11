import { Controller, Post, Body, Req, Request } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.companiesService.create(createCompanyDto, tenantId);
  }
}