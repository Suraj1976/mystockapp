import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    } catch (error) {
      console.error('Error in processPayment:', error);
      throw new InternalServerErrorException('Error processing payment');
    }
  }

  async getPaymentHistory(userId: string) {
    try {
      return this.paymentModel.find({ userId }).exec();
    } catch (error) {
      console.error('Error in getPaymentHistory:', error);
      throw new InternalServerErrorException('Error fetching payment history');
    }
  }
}