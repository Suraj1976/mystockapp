import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRole } from '../../enums/user-role.enum';

@Controller('quotations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.COMPANY_ADMIN, UserRole.SALES_STAFF)
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Post()
  async create(@Request() req, @Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationsService.create(createQuotationDto, {
      userId: req.user.userId,
      role: req.user.role,
    });
  }

  @Get()
  findAll() {
    return this.quotationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotationsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body() updateQuotationDto: UpdateQuotationDto) {
    return this.quotationsService.update(id, updateQuotationDto, {
      userId: req.user.userId,
      role: req.user.role,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.quotationsService.remove(id, {
      userId: req.user.userId,
      role: req.user.role,
    });
  }
}