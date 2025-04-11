import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { EmailService } from '../email/email.service';
import { ClientDocument } from '../clients/client.schema';

@Injectable()
export class TasksService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly emailService: EmailService,
  ) {}

  async getTasks() {
    return [
      { id: 1, name: 'Check Expiring Clients', schedule: 'Every day at 9 AM' },
      { id: 2, name: 'Send Reminders', schedule: 'Every day at 1 PM' },
    ];
  }

  async checkExpiringClients(): Promise<any[]> {
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
      await this.emailService.sendEmail(
        client.email,
        'Client Expiry Reminder',
        `Your client subscription is expiring on ${client.expiryDate.toISOString().split('T')[0]}. Days remaining: ${daysRemaining}.`,
      );
    }

    return expiringClients.map((client: ClientDocument) => ({
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
      await this.emailService.sendEmail(
        client.email,
        'Urgent: Client Expiry Reminder',
        `Your client subscription is expiring soon on ${client.expiryDate.toISOString().split('T')[0]}. Please renew.`,
      );
    }
  }
}