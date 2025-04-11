import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { CsvService } from './formats/csv.service';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [UsersModule, CompaniesModule, ClientsModule],
  controllers: [ExportController],
  providers: [ExportService, CsvService],
  exports: [ExportService],
})
export class ExportModule {}