import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { InvoiceService } from './invoice/invoice.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private invoiceService: InvoiceService,
  ) {}

  async processPayment(paymentDetails: any) {
    // Implement payment gateway (e.g., Stripe)
    const payment = new this.paymentModel({
      amount: paymentDetails.amount,
      status: 'success',
      timestamp: new Date(),
      userId: paymentDetails.userId,
    });
    await payment.save();
    await this.invoiceService.generateInvoice(payment._id.toString(), paymentDetails.amount);
    return { success: true };
  }

  async getPaymentHistory(userId: string) {
    return this.paymentModel.find({ userId }).exec();
  }
}