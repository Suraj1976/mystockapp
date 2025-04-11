import { Module } from '@nestjs/common';
import { CustomServiceController } from './custom-service.controller';
import { CustomService } from './custom-service.service';

@Module({
  controllers: [CustomServiceController],
  providers: [CustomService],
  exports: [CustomService],
})
export class CustomServiceModule {}