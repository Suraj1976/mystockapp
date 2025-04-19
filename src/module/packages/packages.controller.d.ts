import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
export declare class PackagesController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    create(createPackageDto: CreatePackageDto): Promise<import("./packages.schema").PackageDocument>;
    findAll(): Promise<import("./packages.schema").PackageDocument[]>;
}
