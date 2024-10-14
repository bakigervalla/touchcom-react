import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';
import { DeviceFilter, PageOptions, UserFilter } from '@/common/interfaces';
import {
  AccessException,
  AccessLevel,
  AccessTimeSchedule,
  UserType,
} from '@/common/models';

const useAccessLevelServices = () => {
  const api = useFetchWrapper();

  const getAccessLevels = (pageOptions?: PageOptions) =>
    api.get(paths.API.ACCESS_LEVELS, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: ['accessControls'],
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getAccessLevel = (accessLevelId: number) =>
    api.get(paths.build(paths.API.ACCESS_LEVELS_ID, accessLevelId.toString()), {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: ['accessControls'],
        }),
      },
    });

  const getAccessLevelDevices = (
    accessLevelId: number,
    pageOptions?: PageOptions,
    filters?: DeviceFilter,
  ) =>
    api.get(
      paths.build(paths.API.ACCESS_LEVELS_ID_DEVICES, accessLevelId.toString()),
      {
        searchParams: {
          crudQuery: JSON.stringify({
            where: {
              type: filters?.type,
              name: { contains: filters?.search, mode: 'insensitive' },
            },
            page: pageOptions?.page,
            pageSize: pageOptions?.pageSize,
            orderBy: pageOptions?.orderBy,
          }),
        },
      },
    );

  const getAccessLevelUsers = (
    accessLevelId: number,
    pageOptions?: PageOptions,
    filters?: UserFilter,
  ) =>
    api.get(
      paths.build(paths.API.ACCESS_LEVELS_ID_USERS, accessLevelId.toString()),
      {
        searchParams: {
          crudQuery: JSON.stringify({
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
      },
    );

  const getUsersNotConnectedToAccessLevel = (
    accessLevelId: number,
    pageOptions?: PageOptions,
    filters?: UserFilter,
  ) =>
    api.get(paths.API.USERS, {
      searchParams: {
        crudQuery: JSON.stringify({
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
              every: { accessGroupId: { not: accessLevelId } },
            },
          },
          joins: ['accessControls'],
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getDevicesNotConnectedToAccessLevel = (
    accessLevelId: number,
    pageOptions?: PageOptions,
    filters?: DeviceFilter,
  ) =>
    api.get(paths.API.DEVICES, {
      searchParams: {
        crudQuery: JSON.stringify({
          where: {
            type: filters?.type,
            name: { contains: filters?.search, mode: 'insensitive' },
            accessControls: {
              every: { accessGroupId: { not: accessLevelId } },
            },
          },
          joins: ['accessControls', 'site', 'site.address'],
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const createOrUpdateAccessLevel = (data: Partial<AccessLevel>) =>
    api.post(paths.API.ACCESS_LEVELS, { json: data });

  const removeAccessLevel = (id: number) =>
    api.delete(paths.build(paths.API.ACCESS_LEVELS_ID, id.toString()), {});

  const getAccessLevelTimeSchedule = (accessLevelId: number) =>
    api.get(
      paths.build(
        paths.API.ACCESS_LEVELS_ID_TIME_SCHEDULE,
        accessLevelId.toString(),
      ),
      {},
    );

  const createOrUpdateTimeSchedule = (
    id: number,
    data: Partial<AccessTimeSchedule>,
  ) =>
    api.post(
      paths.build(paths.API.ACCESS_LEVELS_ID_TIME_SCHEDULE, id.toString()),
      { json: data },
    );

  const removeTimeScheduleAccessTime = (
    id: number,
    timeScheduleId: number,
    accessTimeId: number,
  ) =>
    api.delete(
      paths.build(
        paths.API.ACCESS_LEVELS_ID_TIME_SCHEDULE_ID_ACCESS_TIMES_ID,
        id.toString(),
        timeScheduleId.toString(),
        accessTimeId.toString(),
      ),
      {},
    );

  const createOrUpdateException = (
    id: number,
    data: Partial<AccessException>,
  ) =>
    api.post(
      paths.build(paths.API.ACCESS_LEVELS_ID_EXCEPTIONS, id.toString()),
      { json: data },
    );

  const getAccessLevelExceptions = (
    accessLevelId: number,
    pageOptions?: PageOptions,
  ) =>
    api.get(
      paths.build(
        paths.API.ACCESS_LEVELS_ID_EXCEPTIONS,
        accessLevelId.toString(),
      ),
      {
        searchParams: {
          crudQuery: JSON.stringify({
            page: pageOptions?.page,
            pageSize: pageOptions?.pageSize,
            orderBy: pageOptions?.orderBy,
          }),
        },
      },
    );

  const removeException = (id: number, exceptionId: number) =>
    api.delete(
      paths.build(
        paths.API.ACCESS_LEVELS_ID_EXCEPTIONS_ID,
        id.toString(),
        exceptionId.toString(),
      ),
      {},
    );

  const attachAccessLevelToUserAndDevice = (
    id: number,
    userId?: number,
    deviceId?: number,
  ) =>
    api.post(paths.build(paths.API.ACCESS_LEVELS_ID_ATTACH, id.toString()), {
      searchParams: {
        ...(userId ? { userId } : {}),
        ...(deviceId ? { deviceId } : {}),
      },
    });

  const detachAccessLevelFromUserAndDevice = (
    id: number,
    userId?: number,
    deviceId?: number,
  ) =>
    api.post(paths.build(paths.API.ACCESS_LEVELS_ID_DETACH, id.toString()), {
      searchParams: {
        ...(userId ? { userId } : {}),
        ...(deviceId ? { deviceId } : {}),
      },
    });

  return {
    attachAccessLevelToUserAndDevice,
    createOrUpdateAccessLevel,
    createOrUpdateException,
    createOrUpdateTimeSchedule,
    detachAccessLevelFromUserAndDevice,
    getAccessLevel,
    getAccessLevelDevices,
    getAccessLevelExceptions,
    getAccessLevelTimeSchedule,
    getAccessLevelUsers,
    getAccessLevels,
    getDevicesNotConnectedToAccessLevel,
    getUsersNotConnectedToAccessLevel,
    removeAccessLevel,
    removeException,
    removeTimeScheduleAccessTime,
  };
};

export default useAccessLevelServices;
