import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ClientsModule } from '../clients/clients.module'; // ClientModel के लिए

@Module({
  imports: [
    ClientsModule, // ClientModel को उपलब्ध कराने के लिए
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService], // SalesService को एक्सपोर्ट करना
})
export class SalesModule {}