import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.schema';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async findAll(user: any) {
    return this.roleModel.find().exec();
  }

  async create(createRoleDto: { name: string; permissions: { [module: string]: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve?: boolean } } }, user: any) {
    const role = new this.roleModel({ ...createRoleDto, createdBy: user._id });
    return role.save();
  }

  async updatePermissions(role: string, updatePermissionsDto: UpdatePermissionsDto) {
    const roleDoc = await this.roleModel.findOne({ role }).exec();
    if (!roleDoc) {
      const newRole = new this.roleModel({ role, permissions: updatePermissionsDto.permissions });
      return newRole.save();
    }
    roleDoc.permissions = updatePermissionsDto.permissions as any;
    return roleDoc.save();
  }

  async getPermissions(role: string) {
    return this.roleModel.findOne({ role }).exec();
  }
}