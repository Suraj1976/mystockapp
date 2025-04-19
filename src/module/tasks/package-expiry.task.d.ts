import { CompaniesService } from '../companies/companies.service';
import { EmailService } from '../email/email.service';
export declare class PackageExpiryTask {
    private readonly companiesService;
    private readonly emailService;
    private readonly logger;
    constructor(companiesService: CompaniesService, emailService: EmailService);
    handleExpiryCheck(): Promise<void>;
    handleReminder(): Promise<void>;
}
