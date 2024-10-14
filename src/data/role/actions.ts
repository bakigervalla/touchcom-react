import { useRecoilCallback } from 'recoil';

import { BackendError } from '@/common/errors';
import { PageOptions } from '@/common/interfaces';
import { PaginatedPermissions, PaginatedRole, Role } from '@/common/models';

import app from '../app';

import useRoleServices from './services';
import state from './state';

const useRoleActions = () => {
  const service = useRoleServices();
  const { showErrorMessage, showSuccessMessage } = app.actions();

  const getRoles = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions) => {
        set(state.roleAtom, (prev) => ({
          ...prev,
          areRolesLoading: true,
        }));
        service
          .getRoles(pageOptions)
          .then((response: PaginatedRole) => {
            const { data, ...pagination } = response;
            set(state.roleAtom, (prev) => ({
              ...prev,
              roles: data,
              pagination,
              areRolesLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.roleAtom, (prev) => ({
              ...prev,
              areRolesLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getAdminRoles = useRecoilCallback(
    ({ set }) =>
      () => {
        set(state.roleAtom, (prev) => ({
          ...prev,
          areAdminRolesLoading: true,
        }));
        service
          .getAdminRoles()
          .then((response: PaginatedRole) => {
            const { data, ...pagination } = response;
            set(state.roleAtom, (prev) => ({
              ...prev,
              adminRoles: data,
              pagination,
              areAdminRolesLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.roleAtom, (prev) => ({
              ...prev,
              areAdminRolesLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const createRole = useRecoilCallback(
    ({ set }) =>
      (data: Partial<Role>) => {
        service
          .createOrUpdateRole(data)
          .then((response: Role) => {
            set(state.roleAtom, (prev) => ({
              ...prev,
              roles: [...prev.roles, response],
            }));
            showSuccessMessage(`Role (${response.name}) created successfully`);
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const updateRole = useRecoilCallback(
    ({ set }) =>
      (data: Partial<Role>) => {
        service
          .createOrUpdateRole(data)
          .then((response: Role) => {
            set(state.roleAtom, (prev) => {
              const roles = prev.roles.map((role) => {
                if (role.id === response.id) {
                  return response;
                }
                return role;
              });
              return { ...prev, roles };
            });
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const removeRole = useRecoilCallback(
    ({ set }) =>
      (role: Role) => {
        service
          .removeRole(role.id)
          .then(() => {
            set(state.roleAtom, (prev) => ({
              ...prev,
              roles: prev.roles.filter((oldRole) => oldRole.id !== role.id),
            }));
            showSuccessMessage(`Role (${role.name}) removed successfully`);
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const getPermissions = useRecoilCallback(
    ({ set }) =>
      () => {
        set(state.roleAtom, (prev) => ({
          ...prev,
          arePermissionsLoading: true,
        }));
        service
          .getPermissions()
          .then((response: PaginatedPermissions) => {
            const { data, ...pagination } = response;
            set(state.roleAtom, (prev) => ({
              ...prev,
              permissions: data,
              pagination,
              arePermissionsLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.roleAtom, (prev) => ({
              ...prev,
              arePermissionsLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  return {
    createRole,
    getAdminRoles,
    getPermissions,
    getRoles,
    removeRole,
    updateRole,
  };
};

export default useRoleActions;
