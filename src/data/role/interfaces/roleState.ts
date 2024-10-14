import { Pagination, Permission, Role } from '@/common/models';

export interface RoleState {
  roles: Role[];
  adminRoles: Role[];
  permissions: Permission[];
  role: Role | null;
  isRoleLoading: boolean;
  areRolesLoading: boolean;
  areAdminRolesLoading: boolean;
  arePermissionsLoading: boolean;
  pagination: Pagination;
}
