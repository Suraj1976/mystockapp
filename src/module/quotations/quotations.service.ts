import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quotation, QuotationDocument } from './quotation.schema';
import { UserRole } from '../../enums/user-role.enum';

@Injectable()
export class QuotationsService {
  constructor(
    @InjectModel(Quotation.name) private quotationModel: Model<QuotationDocument>,
  ) {}

  async create(createQuotationDto: CreateQuotationDto, user: { userId: string; role: UserRole }): Promise<QuotationDocument> {
    try {
      const quotation = new this.quotationModel({
        ...createQuotationDto,
        createdBy: user.userId,
      });
      return await quotation.save();
    } catch (error) {
      console.error('Error in create:', error);
      throw new InternalServerErrorException('Error creating quotation');
    }
  }

  async findAll(): Promise<QuotationDocument[]> {
    try {
      return this.quotationModel.find().exec();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Error fetching quotations');
    }
  }

  async findOne(id: string): Promise<QuotationDocument> {
    try {
      const quotation = await this.quotationModel.findById(id).exec();
      if (!quotation) {
        throw new NotFoundException(`Quotation with ID ${id} not found`);
      }
      return quotation;
    } catch (error) {
      console.error('Error in findOne:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching quotation');
    }
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto, user: { userId: string; role: UserRole }): Promise<QuotationDocument> {
    try {
      const quotation = await this.findOne(id);
      if (quotation.createdBy.toString() !== user.userId && user.role !== UserRole.COMPANY_ADMIN) {
        throw new ForbiddenException('You can only update your own quotations');
      }
      return this.quotationModel.findByIdAndUpdate(id, updateQuotationDto, { new: true }).exec();
    } catch (error) {
      console.error('Error in update:', error);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Error updating quotation');
    }
  }

  async remove(id: string, user: { userId: string; role: UserRole }): Promise<void> {
    try {
      const quotation = await this.findOne(id);
      if (quotation.createdBy.toString() !== user.userId && user.role !== UserRole.COMPANY_ADMIN) {
        throw new ForbiddenException('You can only delete your own quotations');
      }
      await this.quotationModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error in remove:', error);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Error deleting quotation');
    }
  }
}