export declare class UpdatePermissionsDto {
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
