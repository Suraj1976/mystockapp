export declare class CreateRoleDto {
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
}
