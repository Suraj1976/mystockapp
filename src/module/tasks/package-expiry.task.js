"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PackageExpiryTask_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageExpiryTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const companies_service_1 = require("../companies/companies.service");
const email_service_1 = require("../email/email.service");
let PackageExpiryTask = PackageExpiryTask_1 = class PackageExpiryTask {
    constructor(companiesService, emailService) {
        this.companiesService = companiesService;
        this.emailService = emailService;
        this.logger = new common_1.Logger(PackageExpiryTask_1.name);
    }
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
};
exports.PackageExpiryTask = PackageExpiryTask;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PackageExpiryTask.prototype, "handleExpiryCheck", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_1PM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PackageExpiryTask.prototype, "handleReminder", null);
exports.PackageExpiryTask = PackageExpiryTask = PackageExpiryTask_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService,
        email_service_1.EmailService])
], PackageExpiryTask);
