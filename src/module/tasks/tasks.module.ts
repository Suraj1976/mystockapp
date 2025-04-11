import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ExpiryCheckSchedule } from './schedules/expiry-check.schedule';
import { ReminderSchedule } from './schedules/reminder.schedule';
import { CompaniesModule } from '../companies/companies.module';
import { ClientsModule } from '../clients/clients.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [CompaniesModule, ClientsModule, EmailModule],
  controllers: [TasksController],
  providers: [TasksService, ExpiryCheckSchedule, ReminderSchedule], // ExpiryCheckSchedule और ReminderSchedule जोड़ें
})
export class TasksModule {}