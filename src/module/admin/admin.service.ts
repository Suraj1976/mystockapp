// src/module/admin/admin.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRole } from '../../enums/user-role.enum';
import { randomBytes } from 'crypto';
import { UserDocument } from '../users/user.schema';

@Injectable()
export class AdminService {
  constructor(private usersService: UsersService) {}

  async createAdmin(
    email: string,
    companyId: string,
    role: UserRole = UserRole.COMPANY_ADMIN
  ): Promise<{ userId: string; tempPassword: string }> {
    try {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException(`User with email ${email} already exists`);
      }

      const tempPassword = randomBytes(6).toString('hex');

      const user = await this.usersService.create({
        email,
        password: tempPassword,
        role,
        companyId, // स्ट्रिंग के रूप में पास करें, UsersService में कन्वर्शन होगा
      });

      return { userId: user._id.toString(), tempPassword };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error creating admin');
    }
  }

  async getAdminDetails(userId: string): Promise<UserDocument> {
    try {
      const user = await this.usersService.findById(userId);
      if (!user || user.role !== UserRole.COMPANY_ADMIN) {
        throw new NotFoundException('Admin not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error fetching admin details');
    }
  }
}