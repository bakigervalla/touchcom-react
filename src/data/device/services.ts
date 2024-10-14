import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';
import {
  ChangePassword,
  DeviceFilter,
  PageOptions,
  UserFilter,
} from '@/common/interfaces';
import { CreateDevice, Device, UserType } from '@/common/models';

import { DeviceRegistrationVerification } from './interfaces';

const useDeviceServices = () => {
  const api = useFetchWrapper();

  const getDevicesOverview = () => api.get(paths.API.DEVICES_OVERVIEW, {});

  const getDevices = (pageOptions?: PageOptions, filters?: DeviceFilter) =>
    api.get(paths.API.DEVICES, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'accessControls',
            'accessControls.user',
            'accessControls.accessGroup',
            'version',
            'configuration',
            'site',
            'site.address',
            'site.address.country',
          ],
          where: {
            type: filters?.type,
            name: { contains: filters?.search, mode: 'insensitive' },
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getDevice = (id: string) =>
    api.get(paths.build(paths.API.DEVICES_ID, id), {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'site',
            'site.address',
            'site.address.country',
            'version',
            'configuration',
          ],
        }),
      },
    });

  const getDeviceConfiguration = (id: number) =>
    api.get(paths.build(paths.API.DEVICES_ID_CONFIGURATION, id.toString()), {});

  const createOrUpdateDevice = (data: Device) =>
    api.post(paths.API.DEVICES, { json: data });

  const registerDevice = (data: CreateDevice) =>
    api.post(paths.API.DEVICES_REGISTRATION, { json: data });

  const registrationVerification = (data: DeviceRegistrationVerification) =>
    api.post(paths.API.DEVICE_REGISTRATION_VERIFICATION, { json: data });

  const activate = (id: number) =>
    api.post(paths.build(paths.API.DEVICES_ID_ACTIVATE, id.toString()), {});

  const reset = (id: number) =>
    api.post(paths.build(paths.API.DEVICES_ID_RESET, id.toString()), {});

  const remove = (id: number) =>
    api.delete(paths.build(paths.API.DEVICES_ID, id.toString()), {});

  const changeDevicePassword = (id: number, data: ChangePassword) =>
    api.post(paths.build(paths.API.DEVICES_ID_CHANGE_PASSWORD, id.toString()), {
      json: data,
    });

  const getDeviceUsers = (
    id: number,
    pageOptions?: PageOptions,
    filters?: UserFilter,
  ) =>
    api.get(paths.build(paths.API.DEVICES_ID_USERS, id.toString()), {
      searchParams: {
        crudQuery: JSON.stringify({
          where: {
            status: filters?.status,
            type:
              filters?.type === UserType.RESIDENT ? undefined : filters?.type,
            ...(filters?.search
              ? {
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
                }
              : {}),
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getDevicesNotConnectedToUser = (
    userId: number,
    pageOptions?: PageOptions,
    filters?: DeviceFilter,
  ) =>
    api.get(paths.API.DEVICES, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'accessControls',
            'version',
            'configuration',
            'site',
            'site.address',
            'site.address.country',
          ],
          where: {
            type: filters?.type,
            name: { contains: filters?.search, mode: 'insensitive' },
            accessControls: {
              every: { userId: { not: userId } },
            },
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const changeUserVisibilityOnDevice = (
    deviceId: number,
    userId: number,
    isVisible: boolean,
  ) =>
    api.post(
      paths.build(
        paths.API.DEVICES_ID_USERS_ID_CHANGE_VISIBILITY,
        deviceId.toString(),
        userId.toString(),
      ),
      { searchParams: { isVisible } },
    );

  const addUserToDevice = (deviceId: number, userId: number) =>
    api.post(
      paths.build(
        paths.API.DEVICES_ID_USERS_ID_ADD,
        deviceId.toString(),
        userId.toString(),
      ),
      {},
    );

  const removeUserFromDevice = (deviceId: number, userId: number) =>
    api.post(
      paths.build(
        paths.API.DEVICES_ID_USERS_ID_REMOVE,
        deviceId.toString(),
        userId.toString(),
      ),
      {},
    );

  const changeImage = (image: File, deviceId: number) => {
    const formData = new FormData();
    formData.append('file', image);
    return api.post(
      paths.build(paths.API.DEVICES_ID_CHANGE_IMAGE, deviceId.toString()),
      { body: formData },
    );
  };

  return {
    activate,
    addUserToDevice,
    changeDevicePassword,
    changeImage,
    changeUserVisibilityOnDevice,
    createOrUpdateDevice,
    getDevice,
    getDeviceConfiguration,
    getDeviceUsers,
    getDevices,
    getDevicesNotConnectedToUser,
    getDevicesOverview,
    registerDevice,
    registrationVerification,
    remove,
    removeUserFromDevice,
    reset,
  };
};

export default useDeviceServices;
