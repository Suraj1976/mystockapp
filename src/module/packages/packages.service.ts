import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package, PackageDocument } from './packages.schema';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class PackagesService {
  constructor(@InjectModel(Package.name) private packageModel: Model<PackageDocument>) {}

  async create(createPackageDto: CreatePackageDto): Promise<PackageDocument> {
    const pkg = new this.packageModel(createPackageDto);
    return pkg.save();
  }

  async findById(id: string): Promise<PackageDocument> {
    return this.packageModel.findById(id).exec();
  }

  async findAll(): Promise<PackageDocument[]> {
    return this.packageModel.find().exec();
  }
}