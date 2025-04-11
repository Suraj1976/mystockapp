import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomService {
  private services: { name: string; description: string }[] = [];

  addService(name: string, description: string) {
    this.services.push({ name, description });
    return this.services;
  }

  getServices() {
    return this.services;
  }
}