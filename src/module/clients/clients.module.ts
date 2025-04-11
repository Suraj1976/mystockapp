import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientSchema } from './client.schema';
import { CompaniesModule } from '../companies/companies.module'; // CompaniesModule इम्पोर्ट करें

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
    CompaniesModule, // CompaniesModule इम्पोर्ट करें
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}