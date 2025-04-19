"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const redis_storage_1 = require("./redis-storage");
const auth_module_1 = require("./module/auth/auth.module");
const users_module_1 = require("./module/users/users.module");
const roles_module_1 = require("./module/roles/roles.module");
const quotations_module_1 = require("./module/quotations/quotations.module");
const companies_module_1 = require("./module/companies/companies.module");
const clients_module_1 = require("./module/clients/clients.module");
const packages_module_1 = require("./module/packages/packages.module");
const admin_module_1 = require("./module/admin/admin.module");
const manager_module_1 = require("./module/manager/manager.module");
const sales_module_1 = require("./module/sales/sales.module");
const super_super_admin_module_1 = require("./module/super-admin/super-super-admin.module");
const accounts_module_1 = require("./module/accounts/accounts.module");
const email_module_1 = require("./module/email/email.module");
const logger_module_1 = require("./module/logger/logger.module");
const tasks_module_1 = require("./module/tasks/tasks.module");
const notifications_module_1 = require("./module/notifications/notifications.module");
const audit_logs_module_1 = require("./module/audit-logs/audit-logs.module");
const rate_limit_module_1 = require("./module/rate-limiting/rate-limit.module");
const health_module_1 = require("./module/health/health.module");
const export_module_1 = require("./module/export/export.module");
const settings_module_1 = require("./module/settings/settings.module");
const payment_module_1 = require("./module/payment/payment.module");
const custom_service_module_1 = require("./module/custom-service/custom-service.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URI') || 'mongodb://localhost/nestjs',
                }),
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    throttlers: [
                        {
                            ttl: configService.get('THROTTLE_TTL') || 60,
                            limit: configService.get('THROTTLE_LIMIT') || 10,
                        },
                    ],
                    storage: new redis_storage_1.RedisStorage({
                        host: configService.get('REDIS_HOST') || 'localhost',
                        port: configService.get('REDIS_PORT') || 6380,
                    }),
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            quotations_module_1.QuotationsModule,
            companies_module_1.CompaniesModule,
            clients_module_1.ClientsModule,
            packages_module_1.PackagesModule,
            admin_module_1.AdminModule,
            manager_module_1.ManagerModule,
            sales_module_1.SalesModule,
            super_super_admin_module_1.SuperSuperAdminModule,
            accounts_module_1.AccountsModule,
            email_module_1.EmailModule,
            logger_module_1.LoggerModule,
            tasks_module_1.TasksModule,
            notifications_module_1.NotificationsModule,
            audit_logs_module_1.AuditLogsModule,
            rate_limit_module_1.RateLimitingModule,
            health_module_1.HealthModule,
            export_module_1.ExportModule,
            settings_module_1.SettingsModule,
            payment_module_1.PaymentModule,
            custom_service_module_1.CustomServiceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
