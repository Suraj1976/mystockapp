import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { InvoiceService } from './invoice/invoice.service';
export declare class PaymentService {
    private paymentModel;
    private invoiceService;
    constructor(paymentModel: Model<PaymentDocument>, invoiceService: InvoiceService);
    processPayment(paymentDetails: any): Promise<{
        success: boolean;
        invoicePath: string;
    }>;
    getPaymentHistory(userId: string): Promise<(import("mongoose").Document<unknown, {}, PaymentDocument> & Payment & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
