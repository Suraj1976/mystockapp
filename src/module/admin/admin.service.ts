import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {}

  async createUser(email: string, role: string, companyId: string) {
    const tempPassword = randomBytes(6).toString('hex');
    const user = await this.usersService.create({ email, password: tempPassword, role, companyId });
    return { userId: user._id, tempPassword };
  }

  async getDashboard(user: any) {
    const companies = await this.companiesService.findAllWithDetails();
    const users = await this.usersService.findAll(user.companyId);
    return {
      totalCompanies: companies.length,
      totalUsers: users.length,
      companyId: user.companyId,
    };
  }
}