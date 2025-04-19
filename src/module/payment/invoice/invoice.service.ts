import { Injectable } from '@nestjs/common';
import PDFKit from 'pdfkit';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class InvoiceService {
  async generateInvoice(paymentId: string, amount: number): Promise<string> {
    const doc = new PDFKit();
    const filePath = join(__dirname, '..', '..', '..', 'invoices', `invoice-${paymentId}-${Date.now()}.pdf`);
    const stream = createWriteStream(filePath);

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
}