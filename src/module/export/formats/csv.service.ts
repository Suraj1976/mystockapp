import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CsvService {
  generateCsv(data: any[], filename: string) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
    const filePath = path.join(__dirname, `${filename}.csv`);
    fs.writeFileSync(filePath, `${headers}\n${rows}`);
    return filePath;
  }
}