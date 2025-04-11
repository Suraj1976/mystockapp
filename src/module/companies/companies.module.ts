import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './company.schema';
import { CompaniesService } from './companies.service';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { PackagesModule } from '../packages/packages.module'; // Import PackagesModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    UsersModule, // Ensures UsersService is available
    PackagesModule, // Ensures PackagesService is available
  ],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}