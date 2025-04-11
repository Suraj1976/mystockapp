import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { SuperSuperAdminService } from './super-super-admin.service';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { CreatePackageDto } from '../packages/dto/create-package.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@Controller('super-super-admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_SUPER_ADMIN')
export class SuperSuperAdminController {
  constructor(private readonly superSuperAdminService: SuperSuperAdminService) {}

  @Post('create-company')
  createCompany(@Req() req: AuthenticatedRequest, @Body() createCompanyDto: CreateCompanyDto & { package: CreatePackageDto }) {
    return this.superSuperAdminService.createCompanyWithAdmin(createCompanyDto, req.user.userId);
  }

  @Get('all-companies')
  getAllCompanies() {
    return this.superSuperAdminService.getAllCompanies();
  }

  @Get('company/:id/associated')
  getAssociatedCompanies(@Param('id') id: string) {
    return this.superSuperAdminService.getAssociatedCompanies(id);
  }

  @Post('company/:id/add-associated')
  addAssociatedCompany(@Param('id') id: string, @Body() body: { associatedCompanyId: string }) {
    return this.superSuperAdminService.addAssociatedCompany(id, body.associatedCompanyId);
  }

  @Post('company/:id/remove-associated')
  removeAssociatedCompany(@Param('id') id: string, @Body() body: { associatedCompanyId: string }) {
    return this.superSuperAdminService.removeAssociatedCompany(id, body.associatedCompanyId);
  }

  @Get('company/:id/form-details')
  getCompanyDetailsForForm(@Param('id') id: string) {
    return this.superSuperAdminService.getCompanyDetailsForForm(id);
  }

  @Get('company/license/:licenseNumber')
  getCompanyByLicense(@Param('licenseNumber') licenseNumber: string) {
    return this.superSuperAdminService.getCompanyByLicense(licenseNumber);
  }
}