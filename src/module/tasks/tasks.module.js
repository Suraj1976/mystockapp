"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const tasks_controller_1 = require("./tasks.controller");
const expiry_check_schedule_1 = require("./schedules/expiry-check.schedule");
const reminder_schedule_1 = require("./schedules/reminder.schedule");
const companies_module_1 = require("../companies/companies.module");
const clients_module_1 = require("../clients/clients.module");
const email_module_1 = require("../email/email.module");
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [companies_module_1.CompaniesModule, clients_module_1.ClientsModule, email_module_1.EmailModule],
        controllers: [tasks_controller_1.TasksController],
        providers: [tasks_service_1.TasksService, expiry_check_schedule_1.ExpiryCheckSchedule, reminder_schedule_1.ReminderSchedule], // ExpiryCheckSchedule और ReminderSchedule जोड़ें
    })
], TasksModule);
