import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module'; // UsersModule इम्पोर्ट करें
import { CompaniesModule } from '../companies/companies.module'; // CompaniesModule इम्पोर्ट करें

@Module({
  imports: [UsersModule, CompaniesModule], // दोनों मॉड्यूल्स इम्पोर्ट करें
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}