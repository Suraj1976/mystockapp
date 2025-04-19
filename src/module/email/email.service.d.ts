import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    private verifyTransporter;
    sendEmail(to: string, subject: string, text: string, html?: string): Promise<nodemailer.SentMessageInfo>;
    sendCompanyAdminCredentials(to: string, tempPassword: string, language: string): Promise<nodemailer.SentMessageInfo>;
}
