import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';
import { AccessKeyFilter, PageOptions } from '@/common/interfaces';
import { AccessTimeSchedule, UpsertAccessKey } from '@/common/models';

const useAccessKeyServices = () => {
  const api = useFetchWrapper();

  const getAccessKeysOverview = () =>
    api.get(paths.API.ACCESS_KEYS_OVERVIEW, {});

  const getAccessKeys = (
    pageOptions?: PageOptions,
    filters?: AccessKeyFilter,
  ) =>
    api.get(paths.API.ACCESS_KEYS, {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'accessKeyProvider',
            'accessControl',
            'accessControl.user',
            'accessControl.device',
          ],
          where: {
            status: filters?.status,
            name: { contains: filters?.search, mode: 'insensitive' },
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getAccessKey = (id: number) =>
    api.get(paths.build(paths.API.ACCESS_KEYS_ID, id.toString()), {
      searchParams: {
        crudQuery: JSON.stringify({
          joins: [
            'accessKeyProvider',
            'accessControl',
            'accessControl.user',
            'accessControl.device',
          ],
        }),
      },
    });

  const getUserAccessKeys = (userId: number, pageOptions?: PageOptions) =>
    api.get(paths.API.ACCESS_KEYS, {
      searchParams: {
        crudQuery: JSON.stringify({
          where: {
            accessControl: { userId },
          },
          joins: ['accessControl'],
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getAccessKeysNotConnectedToUser = (
    userId: number,
    pageOptions?: PageOptions,
    filters?: AccessKeyFilter,
  ) =>
    api.get(paths.API.ACCESS_KEYS, {
      searchParams: {
        crudQuery: JSON.stringify({
          where: {
            status: filters?.status,
            name: { contains: filters?.search, mode: 'insensitive' },
            accessControl: { userId: { not: userId } },
          },
          joins: ['accessControl'],
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const createOrUpdateAccessKey = (data: UpsertAccessKey) =>
    api.post(paths.API.ACCESS_KEYS, { json: data });

  const removeAccessKey = (id: number) =>
    api.delete(paths.build(paths.API.ACCESS_KEYS_ID, id.toString()), {});

  const getAccessKeyTimeSchedule = (accessKeyId: number) =>
    api.get(
      paths.build(
        paths.API.ACCESS_KEYS_ID_TIME_SCHEDULE,
        accessKeyId.toString(),
      ),
      {},
    );

  const createOrUpdateTimeSchedule = (
    id: number,
    data: Partial<AccessTimeSchedule>,
  ) =>
    api.post(
      paths.build(paths.API.ACCESS_KEYS_ID_TIME_SCHEDULE, id.toString()),
      { json: data },
    );

  const removeTimeScheduleAccessTime = (
    id: number,
    timeScheduleId: number,
    accessTimeId: number,
  ) =>
    api.delete(
      paths.build(
        paths.API.ACCESS_KEYS_ID_TIME_SCHEDULE_ID_ACCESS_TIMES_ID,
        id.toString(),
        timeScheduleId.toString(),
        accessTimeId.toString(),
      ),
      {},
    );

  const attachAccessKeyToUserAndDevice = (
    id: number,
    userId?: number,
    deviceId?: number,
  ) =>
    api.post(paths.build(paths.API.ACCESS_KEYS_ID_ATTACH, id.toString()), {
      searchParams: {
        ...(userId ? { userId } : {}),
        ...(deviceId ? { deviceId } : {}),
      },
    });

  const detachAccessKeyFromUserAndDevice = (
    id: number,
    userId?: number,
    deviceId?: number,
  ) =>
    api.post(paths.build(paths.API.ACCESS_KEYS_ID_DETACH, id.toString()), {
      searchParams: {
        ...(userId ? { userId } : {}),
        ...(deviceId ? { deviceId } : {}),
      },
    });

  return {
    attachAccessKeyToUserAndDevice,
    createOrUpdateAccessKey,
    createOrUpdateTimeSchedule,
    detachAccessKeyFromUserAndDevice,
    getAccessKey,
    getAccessKeyTimeSchedule,
    getAccessKeys,
    getAccessKeysNotConnectedToUser,
    getAccessKeysOverview,
    getUserAccessKeys,
    removeAccessKey,
    removeTimeScheduleAccessTime,
  };
};

export default useAccessKeyServices;
