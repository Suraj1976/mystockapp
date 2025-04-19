import { TasksService } from '../tasks.service';
export declare class ReminderSchedule {
    private tasksService;
    private readonly logger;
    constructor(tasksService: TasksService);
    handleReminder(): Promise<void>;
}
