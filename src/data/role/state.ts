import { atom, selector } from 'recoil';

import { Pagination } from '@/common/models';

import { RoleState } from './interfaces';

const roleAtom = atom<RoleState>({
  key: 'roles',
  default: {
    roles: [],
    adminRoles: [],
    permissions: [],
    role: null,
    isRoleLoading: false,
    areRolesLoading: false,
    areAdminRolesLoading: false,
    arePermissionsLoading: false,
    pagination: new Pagination(),
  },
});

const role = selector({
  key: 'role',
  get: ({ get }) => get(roleAtom).role,
});

export default { roleAtom, role };
