import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ExpiryCheckSchedule } from './schedules/expiry-check.schedule';
import { ReminderSchedule } from './schedules/reminder.schedule';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_SUPER_ADMIN')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly packageExpiryTask: ExpiryCheckSchedule,
    private readonly reminderSchedule: ReminderSchedule,
  ) {}

  @Get()
  async getTasks() {
    return this.tasksService.getTasks();
  }

  @Post('check-expiries')
  async checkExpiries() {
    const result = await this.tasksService.checkExpiringClients();
    await this.packageExpiryTask.handleExpiryCheck();
    return { message: 'Expiry check completed', result };
  }

  @Post('send-reminders')
  async sendReminders() {
    await this.tasksService.sendReminders();
    await this.reminderSchedule.handleReminder();
    return { message: 'Reminders sent' };
  }
}