import { useFetchWrapper } from '@/hooks';

import { pagination, paths } from '@/common/constants';
import { PageOptions } from '@/common/interfaces';
import { Role } from '@/common/models';

const useRoleServices = () => {
  const api = useFetchWrapper();

  const getRoles = (pageOptions?: PageOptions) =>
    api.get(paths.API.ROLES, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: ['permissions', 'permissions.permission'],
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getAdminRoles = () =>
    api.get(paths.API.ROLES, {
      searchParams: {
        crudQuery: JSON.stringify({
          where: {
            permissions: {
              some: { permission: { is: { key: 'ADMIN_WEB' } } },
            },
          },
          joins: ['permissions', 'permissions.permission'],
        }),
      },
    });

  const createOrUpdateRole = (data: Partial<Role>) =>
    api.post(paths.API.ROLES, { json: data });

  const removeRole = (id: number) =>
    api.delete(paths.build(paths.API.ROLES_ID, id.toString()), {});

  const getPermissions = () =>
    api.get(paths.API.PERMISSIONS, {
      searchParams: {
        crudQuery: JSON.stringify({
          pageSize: pagination.PERMISSIONS.PAGE_SIZE,
        }),
      },
    });

  return {
    createOrUpdateRole,
    getAdminRoles,
    getPermissions,
    getRoles,
    removeRole,
  };
};

export default useRoleServices;
