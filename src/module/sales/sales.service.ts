import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../clients/client.schema';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel('Client') private clientModel: Model<ClientDocument>,
  ) {}

  async findAllClients(): Promise<ClientDocument[]> {
    try {
      const clients = await this.clientModel.find().exec();
      console.log(`Fetched ${clients.length} clients for sales`);
      return clients;
    } catch (error: unknown) {
      console.error('Error fetching clients for sales:', error);
      throw error;
    }
  }

  // Add more methods as needed
}