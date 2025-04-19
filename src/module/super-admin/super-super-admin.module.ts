import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperSuperAdminService } from './super-super-admin.service';
import { SuperSuperAdminController } from './super-super-admin.controller';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { PackagesModule } from '../packages/packages.module';
import { EmailModule } from '../email/email.module';
import { Company, CompanySchema } from '../companies/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]), // CompanyModel को रजिस्टर करें
    CompaniesModule,
    UsersModule,
    PackagesModule,
    EmailModule,
  ],
  controllers: [SuperSuperAdminController],
  providers: [SuperSuperAdminService],
})
export class SuperSuperAdminModule {}