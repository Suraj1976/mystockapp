import { TasksService } from '../tasks.service';
export declare class ExpiryCheckSchedule {
    private tasksService;
    private readonly logger;
    constructor(tasksService: TasksService);
    handleExpiryCheck(): Promise<void>;
}
