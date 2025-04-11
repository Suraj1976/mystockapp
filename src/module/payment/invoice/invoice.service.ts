import { Injectable } from '@nestjs/common';
import * as PDFKit from 'pdfkit';

@Injectable()
export class InvoiceService {
  async generateInvoice(paymentId: string, amount: number) {
    const doc = new PDFKit();
    doc.text(`Invoice for Payment ID: ${paymentId}`);
    doc.text(`Amount: ${amount}`);
    doc.end();
    // Save or send the PDF
    console.log(`Generated invoice for payment ${paymentId}`);
  }
}