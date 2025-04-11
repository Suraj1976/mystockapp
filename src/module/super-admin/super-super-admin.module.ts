import { Module } from '@nestjs/common';
import { SuperSuperAdminService } from './super-super-admin.service';
import { SuperSuperAdminController } from './super-super-admin.controller'; // सही फाइल इम्पोर्ट करें
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { PackagesModule } from '../packages/packages.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [CompaniesModule, UsersModule, PackagesModule, EmailModule],
  controllers: [SuperSuperAdminController],
  providers: [SuperSuperAdminService],
})
export class SuperSuperAdminModule {}