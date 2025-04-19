"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomService = void 0;
const common_1 = require("@nestjs/common");
let CustomService = class CustomService {
    constructor() {
        this.services = [];
    }
    addService(name, description) {
        this.services.push({ name, description });
        return this.services;
    }
    getServices() {
        return this.services;
    }
};
exports.CustomService = CustomService;
exports.CustomService = CustomService = __decorate([
    (0, common_1.Injectable)()
], CustomService);
