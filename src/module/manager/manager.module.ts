import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { ClientsModule } from '../clients/clients.module'; // ClientsService के लिए
import { UsersModule } from '../users/users.module'; // UsersService के लिए

@Module({
  imports: [
    ClientsModule, // ClientsService को उपलब्ध कराने के लिए
    UsersModule,   // UsersService को उपलब्ध कराने के लिए
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService], // ManagerService को एक्सपोर्ट करना
})
export class ManagerModule {}