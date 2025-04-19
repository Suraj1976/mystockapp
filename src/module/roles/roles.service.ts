import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.schema'; // सही पथ
import { UpdatePermissionsDto } from './dto/update-permissions.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async findAll(user: any) {
    try {
      return this.roleModel.find().exec();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Error fetching roles');
    }
  }

  async create(createRoleDto: { name: string; permissions: { [module: string]: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve?: boolean } } }, user: any) {
    try {
      const role = new this.roleModel({ ...createRoleDto, createdBy: user._id });
      return role.save();
    } catch (error) {
      console.error('Error in create:', error);
      throw new InternalServerErrorException('Error creating role');
    }
  }

  async updatePermissions(role: string, updatePermissionsDto: UpdatePermissionsDto) {
    try {
      const roleDoc = await this.roleModel.findOne({ name: role }).exec(); // 'role' को 'name' से मेल खाने के लिए
      if (!roleDoc) {
        const newRole = new this.roleModel({ name: role, permissions: updatePermissionsDto.permissions });
        return newRole.save();
      }
      roleDoc.permissions = updatePermissionsDto.permissions;
      return roleDoc.save();
    } catch (error) {
      console.error('Error in updatePermissions:', error);
      throw new InternalServerErrorException('Error updating permissions');
    }
  }

  async findOne(id: string): Promise<RoleDocument> {
    try {
      const role = await this.roleModel.findById(id).exec();
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
      return role;
    } catch (error) {
      console.error('Error in findOne:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching role');
    }
  }

  async update(id: string, updateRoleDto: { name?: string; permissions?: any }): Promise<RoleDocument> {
    try {
      const role = await this.findOne(id);
      return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).exec();
    } catch (error) {
      console.error('Error in update:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating role');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const role = await this.findOne(id);
      await this.roleModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error in remove:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting role');
    }
  }
}