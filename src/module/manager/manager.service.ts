import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
  async getDashboard() {
    return { message: 'Manager dashboard data' };
  }
}