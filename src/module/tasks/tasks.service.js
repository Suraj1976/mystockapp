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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("../clients/clients.service");
const email_service_1 = require("../email/email.service");
let TasksService = class TasksService {
    constructor(clientsService, emailService) {
        this.clientsService = clientsService;
        this.emailService = emailService;
    }
    async getTasks() {
        return [
            { id: 1, name: 'Check Expiring Clients', schedule: 'Every day at 9 AM' },
            { id: 2, name: 'Send Reminders', schedule: 'Every day at 1 PM' },
        ];
    }
    async checkExpiringClients() {
        const clients = await this.clientsService.findAll();
        const now = new Date();
        const expiringClients = clients.filter(client => {
            const expiryDate = new Date(client.expiryDate);
            const diffTime = expiryDate.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7 && diffDays >= 0;
        });
        for (const client of expiringClients) {
            const daysRemaining = Math.ceil((new Date(client.expiryDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            await this.emailService.sendEmail(client.email, 'Client Expiry Reminder', `Your client subscription is expiring on ${client.expiryDate.toISOString().split('T')[0]}. Days remaining: ${daysRemaining}.`);
        }
        return expiringClients.map((client) => ({
            clientId: client._id,
            daysRemaining: Math.ceil((new Date(client.expiryDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        }));
    }
    async sendReminders() {
        const clients = await this.clientsService.findAll();
        const now = new Date();
        const reminderClients = clients.filter(client => {
            const expiryDate = new Date(client.expiryDate);
            const diffTime = expiryDate.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 3 && diffDays >= 0;
        });
        for (const client of reminderClients) {
            await this.emailService.sendEmail(client.email, 'Urgent: Client Expiry Reminder', `Your client subscription is expiring soon on ${client.expiryDate.toISOString().split('T')[0]}. Please renew.`);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService,
        email_service_1.EmailService])
], TasksService);
