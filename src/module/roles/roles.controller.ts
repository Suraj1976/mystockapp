import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRole } from '../../enums/user-role.enum';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_SUPER_ADMIN)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Request() req, @Body() createRoleDto: { name: string; permissions: { [module: string]: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve?: boolean } } }) {
    return this.rolesService.create(createRoleDto, req.user);
  }

  @Get()
  async findAll(@Request() req) {
    return this.rolesService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: { name?: string; permissions?: any }) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}