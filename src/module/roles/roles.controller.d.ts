import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(req: any, createRoleDto: {
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
    }): Promise<import("mongoose").Document<unknown, {}, import("./role.schema").RoleDocument> & import("./role.schema").Role & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./role.schema").RoleDocument> & import("./role.schema").Role & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("./role.schema").RoleDocument>;
    update(id: string, updateRoleDto: {
        name?: string;
        permissions?: any;
    }): Promise<import("./role.schema").RoleDocument>;
    remove(id: string): Promise<void>;
}
