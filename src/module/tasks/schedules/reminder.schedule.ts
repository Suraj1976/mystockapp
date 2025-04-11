import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TasksService } from '../tasks.service';

@Injectable()
export class ReminderSchedule {
  private readonly logger = new Logger(ReminderSchedule.name);

  constructor(private tasksService: TasksService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async handleReminder() {
    this.logger.debug('Running reminder check...');
    await this.tasksService.sendReminders();
    this.logger.debug('Reminder check completed');
  }
}