import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { CompaniesModule } from '../companies/companies.module';
import { ClientsModule } from '../clients/clients.module';
import { PackagesModule } from '../packages/packages.module';
import { AccountSchema } from './account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    CompaniesModule,
    ClientsModule,
    PackagesModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}