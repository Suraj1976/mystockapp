import { TasksService } from './tasks.service';
import { ExpiryCheckSchedule } from './schedules/expiry-check.schedule';
import { ReminderSchedule } from './schedules/reminder.schedule';
export declare class TasksController {
    private readonly tasksService;
    private readonly packageExpiryTask;
    private readonly reminderSchedule;
    constructor(tasksService: TasksService, packageExpiryTask: ExpiryCheckSchedule, reminderSchedule: ReminderSchedule);
    getTasks(): Promise<{
        id: number;
        name: string;
        schedule: string;
    }[]>;
    checkExpiries(): Promise<{
        message: string;
        result: any[];
    }>;
    sendReminders(): Promise<{
        message: string;
    }>;
}
