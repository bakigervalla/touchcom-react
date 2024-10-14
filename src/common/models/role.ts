import { Pagination } from './pagination';

export enum PermissionType {
  ACCESS = 'ACCESS',
  USER = 'USER',
  SITE = 'SITE',
  DEVICE = 'DEVICE',
  ACCESS_KEY = 'ACCESS_KEY',
  ACCESS_GROUP = 'ACCESS_GROUP',
  CALL = 'CALL',
  EVENT = 'EVENT',
  DEVICE_EVENT = 'DEVICE_EVENT',
  ADMIN_AND_ROLE = 'ADMIN_AND_ROLE',
}

export interface Permission {
  id: number;
  key: string;
  name: string;
  type: PermissionType;
  description?: string;
}

export interface RolePermission {
  permissionId: number;
  permission: Permission;
}

export interface Role {
  id: number;
  key: string;
  name: string;
  description?: string;
  permissions: RolePermission[];
}

export class PaginatedRole extends Pagination {
  data!: Role[];
}

export class PaginatedPermissions extends Pagination {
  data!: Permission[];
}
