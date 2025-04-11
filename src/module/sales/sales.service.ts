import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesService {
  async getDashboard() {
    return { message: 'Sales dashboard data' };
  }
}