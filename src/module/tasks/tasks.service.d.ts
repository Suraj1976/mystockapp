import { ClientsService } from '../clients/clients.service';
import { EmailService } from '../email/email.service';
export declare class TasksService {
    private readonly clientsService;
    private readonly emailService;
    constructor(clientsService: ClientsService, emailService: EmailService);
    getTasks(): Promise<{
        id: number;
        name: string;
        schedule: string;
    }[]>;
    checkExpiringClients(): Promise<any[]>;
    sendReminders(): Promise<void>;
}
