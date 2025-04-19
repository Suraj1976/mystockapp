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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const expiry_check_schedule_1 = require("./schedules/expiry-check.schedule");
const reminder_schedule_1 = require("./schedules/reminder.schedule");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let TasksController = class TasksController {
    constructor(tasksService, packageExpiryTask, reminderSchedule) {
        this.tasksService = tasksService;
        this.packageExpiryTask = packageExpiryTask;
        this.reminderSchedule = reminderSchedule;
    }
    async getTasks() {
        return this.tasksService.getTasks();
    }
    async checkExpiries() {
        const result = await this.tasksService.checkExpiringClients();
        await this.packageExpiryTask.handleExpiryCheck();
        return { message: 'Expiry check completed', result };
    }
    async sendReminders() {
        await this.tasksService.sendReminders();
        await this.reminderSchedule.handleReminder();
        return { message: 'Reminders sent' };
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Post)('check-expiries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "checkExpiries", null);
__decorate([
    (0, common_1.Post)('send-reminders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "sendReminders", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_SUPER_ADMIN'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService,
        expiry_check_schedule_1.ExpiryCheckSchedule,
        reminder_schedule_1.ReminderSchedule])
], TasksController);
