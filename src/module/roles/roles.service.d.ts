import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.schema';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
export declare class RolesService {
    private roleModel;
    constructor(roleModel: Model<RoleDocument>);
    findAll(user: any): Promise<(import("mongoose").Document<unknown, {}, RoleDocument> & Role & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    create(createRoleDto: {
        name: string;
        permissions: {
            [module: string]: {
                view: boolean;
                create: boolean;
                edit: boolean;
                delete: boolean;
                approve?: boolean;
            };
        };
    }, user: any): Promise<import("mongoose").Document<unknown, {}, RoleDocument> & Role & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updatePermissions(role: string, updatePermissionsDto: UpdatePermissionsDto): Promise<import("mongoose").Document<unknown, {}, RoleDocument> & Role & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<RoleDocument>;
    update(id: string, updateRoleDto: {
        name?: string;
        permissions?: any;
    }): Promise<RoleDocument>;
    remove(id: string): Promise<void>;
}
