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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let SettingsService = class SettingsService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async setLanguage(userId, language) {
        const supportedLanguages = ['en', 'hi', 'es'];
        if (!supportedLanguages.includes(language))
            throw new common_1.BadRequestException('Unsupported language');
        return this.usersService.update(userId, { language });
    }
    translate(message, language) {
        var _a;
        const translations = {
            en: { welcome: 'Welcome' },
            hi: { welcome: 'स्वागत' },
            es: { welcome: 'Bienvenido' },
        };
        return ((_a = translations[language]) === null || _a === void 0 ? void 0 : _a[message]) || message;
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], SettingsService);
