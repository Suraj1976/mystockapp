import { Controller, Post, Body, Put, Param, Delete, Get, UseGuards, Request } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SALES_STAFF')
  async create(@Request() req, @Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto, req.user.userId, req.user.companyId);
  }

  @Get('my-clients')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SALES_STAFF')
  async getMyClients(@Request() req) {
    return this.clientsService.findByCreator(req.user.userId);
  }

  @Put('renew')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SALES_STAFF')
  async selfRenew(@Request() req, @Body() renewClientDto: { expiryDate: string }) {
    return this.clientsService.selfRenew(req.user.userId, renewClientDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SALES_STAFF')
  async update(@Request() req, @Param('id') id: string, @Body() updateData: any) {
    return this.clientsService.update(id, req.user.userId, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SALES_STAFF')
  async delete(@Request() req, @Param('id') id: string) {
    return this.clientsService.delete(id, req.user.userId);
  }
}