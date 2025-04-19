import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisStorage } from './redis-storage';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { RolesModule } from './module/roles/roles.module';
import { QuotationsModule } from './module/quotations/quotations.module';
import { CompaniesModule } from './module/companies/companies.module';
import { ClientsModule } from './module/clients/clients.module';
import { PackagesModule } from './module/packages/packages.module';
import { AdminModule } from './module/admin/admin.module';
import { ManagerModule } from './module/manager/manager.module';
import { SalesModule } from './module/sales/sales.module';
import { SuperSuperAdminModule } from './module/super-admin/super-super-admin.module';
import { AccountsModule } from './module/accounts/accounts.module';
import { EmailModule } from './module/email/email.module';
import { LoggerModule } from './module/logger/logger.module';
import { TasksModule } from './module/tasks/tasks.module';
import { NotificationsModule } from './module/notifications/notifications.module';
import { AuditLogsModule } from './module/audit-logs/audit-logs.module';
import { RateLimitingModule } from './module/rate-limiting/rate-limit.module';
import { HealthModule } from './module/health/health.module';
import { ExportModule } from './module/export/export.module';
import { SettingsModule } from './module/settings/settings.module';
import { PaymentModule } from './module/payment/payment.module';
import { CustomServiceModule } from './module/custom-service/custom-service.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb://localhost/nestjs',
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get<number>('THROTTLE_TTL') || 60,
            limit: configService.get<number>('THROTTLE_LIMIT') || 10,
          },
        ],
        storage: new RedisStorage({
          host: configService.get<string>('REDIS_HOST') || 'localhost',
          port: configService.get<number>('REDIS_PORT') || 6380,
        }),
      }),
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    QuotationsModule,
    CompaniesModule,
    ClientsModule,
    PackagesModule,
    AdminModule,
    ManagerModule,
    SalesModule, // यहाँ पहले से मौजूद है, जो सही है
    SuperSuperAdminModule,
    AccountsModule,
    EmailModule,
    LoggerModule,
    TasksModule,
    NotificationsModule,
    AuditLogsModule,
    RateLimitingModule,
    HealthModule,
    ExportModule,
    SettingsModule,
    PaymentModule,
    CustomServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}