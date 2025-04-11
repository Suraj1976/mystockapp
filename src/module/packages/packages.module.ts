import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { PackageSchema } from './packages.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Package', schema: PackageSchema }])], // Package.name की जगह 'Package'
  controllers: [PackagesController],
  providers: [PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}