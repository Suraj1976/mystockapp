"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = require("fs");
const path_1 = require("path");
let InvoiceService = class InvoiceService {
    async generateInvoice(paymentId, amount) {
        const doc = new pdfkit_1.default();
        const filePath = (0, path_1.join)(__dirname, '..', '..', '..', 'invoices', `invoice-${paymentId}-${Date.now()}.pdf`);
        const stream = (0, fs_1.createWriteStream)(filePath);
        doc.pipe(stream);
        doc.fontSize(25).text('Invoice', 100, 100);
        doc.fontSize(16).text(`Payment ID: ${paymentId}`, 100, 150);
        doc.fontSize(16).text(`Amount: $${amount}`, 100, 180);
        doc.end();
        return new Promise((resolve, reject) => {
            stream.on('finish', () => resolve(filePath));
            stream.on('error', (err) => reject(err));
        });
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)()
], InvoiceService);
