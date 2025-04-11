import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CompaniesService } from '../companies/companies.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class PackageExpiryTask {
  private readonly logger = new Logger(PackageExpiryTask.name);

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleExpiryCheck() {
    this.logger.debug('Checking for expiring packages...');
    const companies = await this.companiesService.findAllWithDetails(); // findAll की जगह findAllWithDetails
    // बाकी कोड
    for (const company of companies) {
      // यहाँ आप पैकेज एक्सपायरी चेक करने का लॉजिक जोड़ सकते हैं
      // उदाहरण: अगर पैकेज एक्सपायर हो रहा है, तो ईमेल भेजें
      if (company.packageId) {
        // पैकेज एक्सपायरी चेक करें
        // this.emailService.sendExpiryNotification(company.email, daysRemaining);
      }
    }
    this.logger.debug('Expiry check completed');
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async handleReminder() {
    this.logger.debug('Sending package expiry reminders...');
    const companies = await this.companiesService.findAllWithDetails(); // findAll की जगह findAllWithDetails
    // बाकी कोड
    for (const company of companies) {
      // यहाँ रिमाइंडर लॉजिक जोड़ें
      // this.emailService.sendReminderNotification(company.email);
    }
    this.logger.debug('Reminder check completed');
  }
}