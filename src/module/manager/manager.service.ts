import { Injectable, ForbiddenException } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { UsersService } from '../users/users.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { UserDocument } from '../users/user.schema';
import { UserRole } from '../../enums/user-role.enum';
import { Types } from 'mongoose';

@Injectable()
export class ManagerService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createManagerDto: CreateManagerDto): Promise<UserDocument> {
    try {
      const manager = await this.usersService.create({
        ...createManagerDto,
        role: UserRole.MANAGER,
      });
      console.log('Manager created:', manager._id);
      return manager;
    } catch (error: unknown) {
      console.error('Error creating manager:', error);
      throw error;
    }
  }

  async findAll(): Promise<UserDocument[]> {
    try {
      const managers = await this.usersService.findAll('');
      return managers.filter(user => user.role === UserRole.MANAGER);
    } catch (error: unknown) {
      console.error('Error finding managers:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<UserDocument> {
    try {
      const user = await this.usersService.findById(id);
      if (!user || user.role !== UserRole.MANAGER) {
        throw new ForbiddenException('Manager not found');
      }
      return user;
    } catch (error: unknown) {
      console.error('Error finding manager:', error);
      throw error;
    }
  }

  async update(id: string, updateManagerDto: UpdateManagerDto): Promise<UserDocument> {
    try {
      // Convert companyId to ObjectId if present
      const updateData: any = { ...updateManagerDto };
      
      if (updateManagerDto.companyId && typeof updateManagerDto.companyId === 'string') {
        updateData.companyId = new Types.ObjectId(updateManagerDto.companyId);
      }

      const updatedManager = await this.usersService.update(id, updateData);
      console.log('Manager updated:', updatedManager._id);
      return updatedManager;
    } catch (error: unknown) {
      console.error('Error updating manager:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id); // Check if manager exists and has correct role
      await this.usersService.delete(id);
      console.log('Manager removed:', id);
    } catch (error: unknown) {
      console.error('Error removing manager:', error);
      throw error;
    }
  }

  async getDashboardData(companyId: string): Promise<{ totalClients: number; totalUsers: number }> {
    try {
      const clients = await this.clientsService.findAllByTenantId(companyId);
      const users = await this.usersService.findAll(companyId);
      return {
        totalClients: clients.length,
        totalUsers: users.length,
      };
    } catch (error: unknown) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }
}