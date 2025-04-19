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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_schema_1 = require("./schemas/payment.schema");
const invoice_service_1 = require("./invoice/invoice.service");
let PaymentService = class PaymentService {
    constructor(paymentModel, invoiceService) {
        this.paymentModel = paymentModel;
        this.invoiceService = invoiceService;
    }
    async processPayment(paymentDetails) {
        try {
            const payment = new this.paymentModel({
                amount: paymentDetails.amount,
                status: 'success',
                timestamp: new Date(),
                userId: paymentDetails.userId,
            });
            await payment.save();
            const invoicePath = await this.invoiceService.generateInvoice(payment._id.toString(), paymentDetails.amount);
            return { success: true, invoicePath };
        }
        catch (error) {
            console.error('Error in processPayment:', error);
            throw new common_1.InternalServerErrorException('Error processing payment');
        }
    }
    async getPaymentHistory(userId) {
        try {
            return this.paymentModel.find({ userId }).exec();
        }
        catch (error) {
            console.error('Error in getPaymentHistory:', error);
            throw new common_1.InternalServerErrorException('Error fetching payment history');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        invoice_service_1.InvoiceService])
], PaymentService);
