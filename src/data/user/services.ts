import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';
import { DeviceFilter, PageOptions, UserFilter } from '@/common/interfaces';
import {
  AcceptInviteRequest,
  InviteUser,
  ResendUserInvitation,
  UserType,
} from '@/common/models';

const useUserServices = () => {
  const api = useFetchWrapper();

  const getAdmins = (pageOptions?: PageOptions, filters?: UserFilter) =>
    api.get(paths.API.USERS, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'role',
            'role.permissions',
            'role.permissions.permission',
            'company',
            'apartment',
            'residents',
            'sites',
            'sites.site',
            'sites.site.address',
            'sites.site.address.country',
            'address',
            'address.country',
            'accessControls',
            'accessControls.device',
            'accessControls.device.configuration',
            'accessControls.accessKey',
            'accessControls.accessGroup',
          ],
          where: {
            status: filters?.status,
            role: {
              permissions: {
                some: { permission: { is: { key: 'ADMIN_WEB' } } },
              },
            },
            OR: [
              {
                name: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                firstName: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                lastName: { contains: filters?.search, mode: 'insensitive' },
              },
            ],
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getUsers = (pageOptions?: PageOptions, filters?: UserFilter) =>
    api.get(paths.API.USERS, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'role',
            'company',
            'apartment',
            'residents',
            'sites',
            'sites.site',
            'sites.site.address',
            'sites.site.address.country',
            'address',
            'address.country',
            'accessControls',
            'accessControls.device',
            'accessControls.device.configuration',
            'accessControls.accessKey',
            'accessControls.accessGroup',
          ],
          where: {
            status: filters?.status,
            type:
              filters?.type === UserType.RESIDENT ? undefined : filters?.type,
            OR: [
              {
                name: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                firstName: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                lastName: { contains: filters?.search, mode: 'insensitive' },
              },
            ],
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getUserResidents = (
    userId: number,
    userType: UserType,
    pageOptions?: PageOptions,
    filters?: UserFilter,
  ) =>
    api.get(paths.API.USERS, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'role',
            'company',
            'apartment',
            'residents',
            'sites',
            'sites.site',
            'sites.site.address',
            'sites.site.address.country',
            'address',
            'address.country',
            'accessControls',
            'accessControls.device',
            'accessControls.device.configuration',
            'accessControls.accessKey',
            'accessControls.accessGroup',
          ],
          where: {
            status: filters?.status,
            type:
              filters?.type === UserType.RESIDENT ? undefined : filters?.type,
            OR: [
              {
                name: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                firstName: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                lastName: { contains: filters?.search, mode: 'insensitive' },
              },
            ],
            ...(userType === UserType.APARTMENT
              ? { apartmentId: userId }
              : { companyId: userId }),
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getResidentsNotConnectedToUser = (
    userId: number,
    userType: UserType,
    pageOptions?: PageOptions,
    filters?: UserFilter,
  ) =>
    api.get(paths.API.USERS, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'role',
            'company',
            'apartment',
            'residents',
            'sites',
            'sites.site',
            'sites.site.address',
            'sites.site.address.country',
            'address',
            'address.country',
            'accessControls',
            'accessControls.device',
            'accessControls.device.configuration',
            'accessControls.accessKey',
            'accessControls.accessGroup',
          ],
          where: {
            id: { not: userId },
            status: filters?.status,
            type: UserType.RESIDENT,
            OR: [
              {
                name: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                firstName: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                lastName: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                ...(userType === UserType.APARTMENT
                  ? {
                      apartmentId: { not: userId },
                    }
                  : {
                      companyId: { not: userId },
                    }),
              },
            ],
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getUserDevices = (
    id: number,
    pageOptions?: PageOptions,
    filters?: DeviceFilter,
  ) =>
    api.get(paths.build(paths.API.USERS_ID_DEVICES, id.toString()), {
      searchParams: {
        crudQuery: JSON.stringify({
          where: {
            type: filters?.type,
            ...(filters?.search
              ? {
                  name: { contains: filters?.search, mode: 'insensitive' },
                }
              : {}),
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getUsersNotConnectedToDevice = (
    deviceId: number,
    pageOptions?: PageOptions,
    filters?: UserFilter,
  ) =>
    api.get(paths.API.USERS, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'role',
            'company',
            'apartment',
            'residents',
            'sites',
            'sites.site',
            'accessControls',
            'accessControls.device',
          ],
          where: {
            status: filters?.status,
            type:
              filters?.type === UserType.RESIDENT ? undefined : filters?.type,
            OR: [
              {
                name: { contains: filters?.search, mode: 'insensitive' },
              },
              {
                firstName: {
                  contains: filters?.search,
                  mode: 'insensitive',
                },
              },
              {
                lastName: {
                  contains: filters?.search,
                  mode: 'insensitive',
                },
              },
            ],
            accessControls: {
              every: { deviceId: { not: deviceId } },
            },
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getUser = (id: string) =>
    api.get(paths.build(paths.API.USERS_ID, id), {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'role',
            'company',
            'apartment',
            'residents',
            'sites',
            'sites.site',
            'sites.site.address',
            'sites.site.address.country',
            'address',
            'address.country',
            'accessControls',
            'accessControls.device',
            'accessControls.accessKey',
            'accessControls.accessGroup',
          ],
        }),
      },
    });

  const createOrUpdateUser = (data: any) =>
    api.post(paths.API.USERS, { json: data });

  const resendUserInvitation = (data: ResendUserInvitation) =>
    api.post(paths.API.USERS_INVITE_RESEND, { json: data });

  const inviteUser = (data: InviteUser) =>
    api.post(paths.API.USERS_INVITE, { json: data });

  const acceptUserInvitation = (data: AcceptInviteRequest) =>
    api.post(paths.API.USERS_ACCEPT_INVITE, { json: data });

  const changeImage = (image: File, userId: number) => {
    const formData = new FormData();
    formData.append('file', image);
    return api.post(
      paths.build(paths.API.USERS_ID_CHANGE_IMAGE, userId.toString()),
      { body: formData },
    );
  };

  return {
    acceptUserInvitation,
    changeImage,
    createOrUpdateUser,
    getAdmins,
    getResidentsNotConnectedToUser,
    getUser,
    getUserDevices,
    getUserResidents,
    getUsers,
    getUsersNotConnectedToDevice,
    inviteUser,
    resendUserInvitation,
  };
};

export default useUserServices;
