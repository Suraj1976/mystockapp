import { IsObject } from 'class-validator';

export class UpdatePermissionsDto {
  @IsObject()
  permissions: { [module: string]: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve?: boolean } };
}