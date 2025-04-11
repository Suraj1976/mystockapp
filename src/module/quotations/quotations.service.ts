import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quotation, QuotationDocument } from './quotation.schema';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UserDocument } from '../users/user.schema';
import { UserRole } from '../users/user-role.enum';

@Injectable()
export class QuotationsService {
  constructor(
    @InjectModel(Quotation.name) private quotationModel: Model<QuotationDocument>,
  ) {}

  async create(createQuotationDto: CreateQuotationDto, user: UserDocument): Promise<Quotation> {
    const quotation = new this.quotationModel({
      ...createQuotationDto,
      createdBy: user._id,
    });
    return quotation.save();
  }

  async findAll(user: UserDocument): Promise<Quotation[]> {
    return this.quotationModel.find({ createdBy: user._id }).exec();
  }
}