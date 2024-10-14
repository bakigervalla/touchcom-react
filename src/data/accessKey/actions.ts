import { omit as _omit } from 'lodash';
import { useRecoilCallback } from 'recoil';

import { BackendError } from '@/common/errors';
import { AccessKeyFilter, PageOptions } from '@/common/interfaces';
import {
  AccessKey,
  AccessKeysOverview,
  AccessTimeSchedule,
  PaginatedAccessKey,
  UpsertAccessKey,
} from '@/common/models';

import app from '../app';
import event from '../event';
import { DeviceEvent } from '../event/interfaces';

import useAccessKeyServices from './services';
import state from './state';

const useAccessKeyActions = () => {
  const service = useAccessKeyServices();
  const { eventHandler } = event.actions();
  const { showErrorMessage, showSuccessMessage } = app.actions();

  const getAccessKeysOverview = useRecoilCallback(
    ({ set }) =>
      () => {
        set(state.accessKeyAtom, (prev) => ({
          ...prev,
          isAccessKeysOverviewLoading: true,
        }));
        service
          .getAccessKeysOverview()
          .then((response: AccessKeysOverview) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKeysOverview: response,
              isAccessKeysOverviewLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              isAccessKeysOverviewLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getAccessKeys = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions, filters?: AccessKeyFilter) => {
        set(state.accessKeyAtom, (prev) => ({
          ...prev,
          areAccessKeysLoading: true,
        }));
        service
          .getAccessKeys(pageOptions, filters)
          .then((response: PaginatedAccessKey) => {
            const { data, ...pagination } = response;
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKeys: data,
              pagination,
              areAccessKeysLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              areAccessKeysLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getAccessKey = useRecoilCallback(
    ({ set }) =>
      (accessKeyId: number) => {
        set(state.accessKeyAtom, (prev) => ({
          ...prev,
          isAccessKeyLoading: true,
        }));
        service
          .getAccessKey(accessKeyId)
          .then((response: AccessKey) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKey: response,
              isAccessKeyLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              isAccessKeyLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getUserAccessKeys = useRecoilCallback(
    ({ set }) =>
      (userId: number, pageOptions?: PageOptions) => {
        set(state.accessKeyAtom, (prev) => ({
          ...prev,
          areUserAccessKeysLoading: true,
        }));
        service
          .getUserAccessKeys(userId, pageOptions)
          .then((response: PaginatedAccessKey) => {
            const { data, ...pagination } = response;
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              userAccessKeys: data,
              userAccessKeysPagination: pagination,
              areUserAccessKeysLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              areUserAccessKeysLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getAccessKeysNotConnectedToUser = useRecoilCallback(
    ({ set }) =>
      (
        userId: number,
        pageOptions?: PageOptions,
        filters?: AccessKeyFilter,
      ) => {
        set(state.accessKeyAtom, (prev) => ({
          ...prev,
          areAccessKeysNotConnectedToUserLoading: true,
        }));
        service
          .getAccessKeysNotConnectedToUser(userId, pageOptions, filters)
          .then((response: PaginatedAccessKey) => {
            const { data, ...pagination } = response;
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKeysNotConnectedToUserPagination: pagination,
              accessKeysNotConnectedToUser: data,
              areAccessKeysNotConnectedToUserLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              areAccessKeysNotConnectedToUserLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const createAccessKey = useRecoilCallback(
    ({ set }) =>
      (data: UpsertAccessKey) => {
        service
          .createOrUpdateAccessKey(data)
          .then((response: AccessKey) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKeys: [...prev.accessKeys, response],
            }));
            showSuccessMessage(
              `Access key (${response.name}) created successfully`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const updateAccessKey = useRecoilCallback(
    ({ set }) =>
      (data: UpsertAccessKey, filters?: AccessKeyFilter) => {
        service
          .createOrUpdateAccessKey(data)
          .then((response: AccessKey) => {
            set(state.accessKeyAtom, (prev) => {
              const accessKeys = prev.accessKeys
                .map((accessKey) => {
                  if (accessKey.id === response.id) {
                    return {
                      ...accessKey,
                      ..._omit(response, [
                        'accessTimeSchedule',
                        'accessControl',
                      ]),
                    };
                  }
                  return accessKey;
                })
                .filter((accessKey) =>
                  filters?.status || filters?.search
                    ? accessKey.status === filters?.status ||
                      accessKey.name === filters?.search
                    : true,
                );
              return {
                ...prev,
                accessKeys,
                userAccessKeys: prev.userAccessKeys.map((userAccessKey) =>
                  userAccessKey.id === response.id
                    ? {
                        ...userAccessKey,
                        ..._omit(response, [
                          'accessTimeSchedule',
                          'accessControl',
                        ]),
                      }
                    : userAccessKey,
                ),
                accessKey: {
                  ...prev.accessKey,
                  ...(_omit(response, [
                    'accessTimeSchedule',
                    'accessControl',
                  ]) as AccessKey),
                },
              };
            });
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const removeAccessKey = useRecoilCallback(
    ({ set }) =>
      (accessKey: AccessKey) => {
        service
          .removeAccessKey(accessKey.id)
          .then(() => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKeys: prev.accessKeys.filter(
                (oldAccessKey) => oldAccessKey.id !== accessKey.id,
              ),
            }));
            showSuccessMessage(
              `Access key (${accessKey.name}) removed successfully`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const getAccessKeyTimeSchedule = useRecoilCallback(
    ({ set }) =>
      (accessKeyId: number) => {
        set(state.accessKeyAtom, (prev) => ({
          ...prev,
          isAccessKeyTimeScheduleLoading: true,
        }));
        service
          .getAccessKeyTimeSchedule(accessKeyId)
          .then((response: AccessTimeSchedule) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKey: <AccessKey>{
                ...prev.accessKey,
                accessTimeSchedule: response,
              },
              isAccessKeyTimeScheduleLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              isAccessKeyTimeScheduleLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const createOrUpdateAccessKeyTimeSchedule = useRecoilCallback(
    ({ set }) =>
      (accessKeyId: number, data: Partial<AccessTimeSchedule>) => {
        service
          .createOrUpdateTimeSchedule(accessKeyId, data)
          .then((response: AccessTimeSchedule) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKey:
                prev.accessKey && prev.accessKey.id === accessKeyId
                  ? {
                      ...prev.accessKey,
                      accessTimeSchedule: {
                        ...prev.accessKey.accessTimeSchedule,
                        ...response,
                        ...('accessTimes' in response
                          ? {
                              accessTimes: [
                                ...(prev.accessKey.accessTimeSchedule
                                  ?.accessTimes ?? []),
                                ...(response.accessTimes || []),
                              ],
                            }
                          : {}),
                      },
                    }
                  : prev.accessKey,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const removeAccessKeyTimeScheduleAccessTime = useRecoilCallback(
    ({ set }) =>
      (accessKeyId: number, timeScheduleId: number, accessTimeId: number) => {
        service
          .removeTimeScheduleAccessTime(
            accessKeyId,
            timeScheduleId,
            accessTimeId,
          )
          .then(() => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKey:
                prev.accessKey && prev.accessKey.id === accessKeyId
                  ? <AccessKey>{
                      ...prev.accessKey,
                      accessTimeSchedule: {
                        ...prev.accessKey.accessTimeSchedule,
                        accessTimes:
                          prev.accessKey.accessTimeSchedule?.accessTimes?.filter(
                            (accessTime) =>
                              accessTime.accessTimeId !== accessTimeId,
                          ),
                      },
                    }
                  : prev.accessKey,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const attachAccessKeyToUserAndDevice = useRecoilCallback(
    ({ set }) =>
      (accessKeyId: number, userId?: number, deviceId?: number) => {
        service
          .attachAccessKeyToUserAndDevice(accessKeyId, userId, deviceId)
          .then((response: AccessKey) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKey: {
                ...prev.accessKey,
                ..._omit(response, ['accessTimeSchedule']),
              },
              accessKeys: prev.accessKeys.map((accessKey) =>
                accessKey.id === accessKeyId
                  ? {
                      ...prev.accessKey,
                      ..._omit(response, ['accessTimeSchedule']),
                    }
                  : accessKey,
              ),
              userAccessKeys: [
                ...prev.userAccessKeys,
                _omit(response, ['accessTimeSchedule']),
              ],
              accessKeysNotConnectedToUser:
                prev.accessKeysNotConnectedToUser.filter(
                  (accessKey) => accessKey.id !== response.id,
                ),
            }));
            if (deviceId) {
              eventHandler({
                deviceId,
                event: DeviceEvent.ACCESS_KEYS_UPDATE,
                options: { isWebTrigger: true },
              });
            }
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const detachAccessKeyFromUserAndDevice = useRecoilCallback(
    ({ set }) =>
      (accessKeyId: number, userId?: number, deviceId?: number) => {
        service
          .detachAccessKeyFromUserAndDevice(accessKeyId, userId, deviceId)
          .then((response: AccessKey) => {
            set(state.accessKeyAtom, (prev) => ({
              ...prev,
              accessKey: {
                ...prev.accessKey,
                ..._omit(response, ['accessTimeSchedule']),
              },
              accessKeys: prev.accessKeys.map((accessKey) =>
                accessKey.id === accessKeyId
                  ? {
                      ...prev.accessKey,
                      ..._omit(response, ['accessTimeSchedule']),
                    }
                  : accessKey,
              ),
            }));
            if (deviceId) {
              eventHandler({
                deviceId,
                event: DeviceEvent.ACCESS_KEYS_UPDATE,
                options: { isWebTrigger: true },
              });
            }
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  return {
    attachAccessKeyToUserAndDevice,
    createAccessKey,
    createOrUpdateAccessKeyTimeSchedule,
    detachAccessKeyFromUserAndDevice,
    getAccessKey,
    getAccessKeyTimeSchedule,
    getAccessKeys,
    getAccessKeysNotConnectedToUser,
    getAccessKeysOverview,
    getUserAccessKeys,
    removeAccessKey,
    removeAccessKeyTimeScheduleAccessTime,
    updateAccessKey,
  };
};

export default useAccessKeyActions;
