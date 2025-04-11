import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TasksService } from '../tasks.service';

@Injectable()
export class ExpiryCheckSchedule {
  private readonly logger = new Logger(ExpiryCheckSchedule.name);

  constructor(private tasksService: TasksService) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handleExpiryCheck() {
    this.logger.debug('Running expiry check...');
    await this.tasksService.checkExpiringClients();
    this.logger.debug('Expiry check completed');
  }
}