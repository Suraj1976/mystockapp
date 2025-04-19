import { Model } from 'mongoose';
import { PackageDocument } from './packages.schema';
import { CreatePackageDto } from './dto/create-package.dto';
export declare class PackagesService {
    private packageModel;
    constructor(packageModel: Model<PackageDocument>);
    create(createPackageDto: CreatePackageDto): Promise<PackageDocument>;
    findById(id: string): Promise<PackageDocument>;
    findAll(): Promise<PackageDocument[]>;
}
