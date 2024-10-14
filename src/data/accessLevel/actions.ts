import { useRecoilCallback } from 'recoil';

import { BackendError } from '@/common/errors';
import { DeviceFilter, PageOptions, UserFilter } from '@/common/interfaces';
import {
  AccessException,
  AccessLevel,
  AccessLevelAccessException,
  AccessTimeSchedule,
  Device,
  PaginatedAccessLevel,
  PaginatedDevice,
  PaginatedUser,
  Pagination,
  User,
} from '@/common/models';

import app from '../app';

import {
  PaginatedAccessLevelDevices,
  PaginatedAccessLevelExceptions,
  PaginatedAccessLevelUsers,
} from './interfaces';
import useAccessLevelServices from './services';
import state from './state';

const useAccessLevelActions = () => {
  const service = useAccessLevelServices();
  const { showErrorMessage, showSuccessMessage } = app.actions();

  const getAccessLevels = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions) => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          areAccessLevelsLoading: true,
        }));
        service
          .getAccessLevels(pageOptions)
          .then((response: PaginatedAccessLevel) => {
            const { data, ...pagination } = response;
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevels: data,
              pagination,
              areAccessLevelsLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              areAccessLevelsLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getAccessLevel = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number) => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          isAccessLevelLoading: true,
        }));
        service
          .getAccessLevel(accessLevelId)
          .then(
            (
              response: AccessLevel & {
                devices: { device: Device; pagination: Pagination }[];
                users: { user: User; pagination: Pagination }[];
              },
            ) => {
              set(state.accessLevelAtom, (prev) => ({
                ...prev,
                accessLevel: response,
                isAccessLevelLoading: false,
              }));
            },
          )
          .catch((error: BackendError) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              isAccessLevelLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getAccessLevelDevices = useRecoilCallback(
    ({ set }) =>
      (
        accessLevelId: number,
        pageOptions?: PageOptions,
        filters?: DeviceFilter,
      ) => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          areAccessLevelDevicesLoading: true,
        }));
        service
          .getAccessLevelDevices(accessLevelId, pageOptions, filters)
          .then((response: PaginatedAccessLevelDevices) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel: <AccessLevel>{
                ...prev.accessLevel,
                devices: response,
              },
              areAccessLevelDevicesLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              areAccessLevelDevicesLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getAccessLevelUsers = useRecoilCallback(
    ({ set }) =>
      (
        accessLevelId: number,
        pageOptions?: PageOptions,
        filters?: UserFilter,
      ) => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          areAccessLevelUsersLoading: true,
        }));
        service
          .getAccessLevelUsers(accessLevelId, pageOptions, filters)
          .then((response: PaginatedAccessLevelUsers) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel: <AccessLevel>{
                ...prev.accessLevel,
                users: response,
              },
              areAccessLevelUsersLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              areAccessLevelUsersLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const createAccessLevel = useRecoilCallback(
    ({ set }) =>
      (data: Partial<AccessLevel>) => {
        service
          .createOrUpdateAccessLevel(data)
          .then((response: AccessLevel) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevels: [...prev.accessLevels, response],
            }));
            showSuccessMessage(
              `Access Level (${response.name}) created successfully`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const updateAccessLevel = useRecoilCallback(
    ({ set }) =>
      (data: Partial<AccessLevel>) => {
        service
          .createOrUpdateAccessLevel(data)
          .then((response: AccessLevel) => {
            set(state.accessLevelAtom, (prev) => {
              const accessLevels = prev.accessLevels.map((accessLevel) => {
                if (accessLevel.id === response.id) {
                  return { ...accessLevel, ...response };
                }
                return accessLevel;
              });
              return {
                ...prev,
                accessLevels,
                accessLevel: {
                  ...prev.accessLevel,
                  ...response,
                },
              };
            });
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const removeAccessLevel = useRecoilCallback(
    ({ set }) =>
      (accessLevel: AccessLevel) => {
        service
          .removeAccessLevel(accessLevel.id)
          .then(() => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevels: prev.accessLevels.filter(
                (oldAccessLevel) => oldAccessLevel.id !== accessLevel.id,
              ),
              accessLevel:
                prev.accessLevel && prev.accessLevel.id === accessLevel.id
                  ? null
                  : accessLevel,
            }));
            showSuccessMessage(
              `Access Level (${accessLevel.name}) removed successfully`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const getAccessLevelTimeSchedule = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number) => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          isAccessLevelTimeScheduleLoading: true,
        }));
        service
          .getAccessLevelTimeSchedule(accessLevelId)
          .then((response: AccessTimeSchedule) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel: <AccessLevel>{
                ...prev.accessLevel,
                accessTimeSchedule: response,
              },
              isAccessLevelTimeScheduleLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              isAccessLevelTimeScheduleLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const createOrUpdateAccessLevelTimeSchedule = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number, data: Partial<AccessTimeSchedule>) => {
        service
          .createOrUpdateTimeSchedule(accessLevelId, data)
          .then((response: AccessTimeSchedule) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel:
                prev.accessLevel && prev.accessLevel.id === accessLevelId
                  ? {
                      ...prev.accessLevel,
                      accessTimeSchedule: {
                        ...prev.accessLevel.accessTimeSchedule,
                        ...response,
                        ...('accessTimes' in response
                          ? {
                              accessTimes: [
                                ...(prev.accessLevel.accessTimeSchedule
                                  ?.accessTimes ?? []),
                                ...(response.accessTimes || []),
                              ],
                            }
                          : {}),
                      },
                    }
                  : prev.accessLevel,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const removeAccessLevelTimeScheduleAccessTime = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number, timeScheduleId: number, accessTimeId: number) => {
        service
          .removeTimeScheduleAccessTime(
            accessLevelId,
            timeScheduleId,
            accessTimeId,
          )
          .then(() => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel:
                prev.accessLevel && prev.accessLevel.id === accessLevelId
                  ? <AccessLevel>{
                      ...prev.accessLevel,
                      accessTimeSchedule: {
                        ...prev.accessLevel.accessTimeSchedule,
                        accessTimes:
                          prev.accessLevel.accessTimeSchedule?.accessTimes?.filter(
                            (accessTime) =>
                              accessTime.accessTimeId !== accessTimeId,
                          ),
                      },
                    }
                  : prev.accessLevel,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const createAccessLevelException = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number, data: Partial<AccessException>) => {
        service
          .createOrUpdateException(accessLevelId, data)
          .then((response: AccessLevelAccessException) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel:
                prev.accessLevel && prev.accessLevel.id === accessLevelId
                  ? {
                      ...prev.accessLevel,
                      accessExceptions: {
                        ...prev.accessLevel.accessExceptions,
                        pageSize:
                          prev.accessLevel.accessExceptions.pageSize + 1,
                        data: [
                          ...prev.accessLevel.accessExceptions.data,
                          response,
                        ],
                      },
                    }
                  : prev.accessLevel,
            }));
            showSuccessMessage(
              `Exception (${response.accessException.name}) created successfully`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const updateAccessLevelException = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number, data: Partial<AccessException>) => {
        service
          .createOrUpdateException(accessLevelId, data)
          .then((response: AccessLevelAccessException) => {
            set(state.accessLevelAtom, (prev) => {
              if (
                !(
                  prev.accessLevel &&
                  prev.accessLevel.id === accessLevelId &&
                  prev.accessLevel.accessExceptions
                )
              ) {
                return prev;
              }

              const accessLevelExceptions =
                prev.accessLevel.accessExceptions.data.map(
                  (accessException) => {
                    if (accessException.id === response.id) {
                      return { ...accessException, ...response };
                    }
                    return accessException;
                  },
                );

              return {
                ...prev,
                accessLevel: {
                  ...prev.accessLevel,
                  accessExceptions: {
                    ...prev.accessLevel.accessExceptions,
                    data: accessLevelExceptions,
                  },
                },
              };
            });
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const getAccessLevelExceptions = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number, pageOptions?: PageOptions) => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          areAccessLevelExceptionsLoading: true,
        }));
        service
          .getAccessLevelExceptions(accessLevelId, pageOptions)
          .then((response: PaginatedAccessLevelExceptions) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel: <AccessLevel>{
                ...prev.accessLevel,
                accessExceptions: response,
              },
              areAccessLevelExceptionsLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              areAccessLevelExceptionsLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const removeException = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number, exceptionId: number) => {
        service
          .removeException(accessLevelId, exceptionId)
          .then((response: AccessException) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel:
                prev.accessLevel && prev.accessLevel.id === accessLevelId
                  ? {
                      ...prev.accessLevel,
                      accessExceptions: {
                        ...prev.accessLevel.accessExceptions,
                        data: prev.accessLevel.accessExceptions.data.filter(
                          (exception: AccessLevelAccessException) =>
                            exception.accessExceptionId !== response.id,
                        ),
                      },
                    }
                  : prev.accessLevel,
            }));
            showSuccessMessage(
              `Exception (${response.name}) removed successfully`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const resetAccessLevelState = useRecoilCallback(
    ({ set }) =>
      () => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          accessLevel: null,
        }));
      },
    [],
  );

  const getDevicesNotConnectedToAccessLevel = useRecoilCallback(
    ({ set }) =>
      (
        accessLevelId: number,
        pageOptions?: PageOptions,
        filters?: DeviceFilter,
      ) => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          areDevicesNotConnectedToAccessLevelLoading: true,
        }));
        service
          .getDevicesNotConnectedToAccessLevel(
            accessLevelId,
            pageOptions,
            filters,
          )
          .then((response: PaginatedDevice) => {
            const { data, ...pagination } = response;
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              devicesNotConnectedToAccessLevelPagination: pagination,
              devicesNotConnectedToAccessLevel: data,
              areDevicesNotConnectedToAccessLevelLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              areDevicesNotConnectedToAccessLevelLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getUsersNotConnectedToAccessLevel = useRecoilCallback(
    ({ set }) =>
      (
        accessLevelId: number,
        pageOptions?: PageOptions,
        filters?: UserFilter,
      ) => {
        set(state.accessLevelAtom, (prev) => ({
          ...prev,
          areUsersNotConnectedToAccessLevelLoading: true,
        }));
        service
          .getUsersNotConnectedToAccessLevel(
            accessLevelId,
            pageOptions,
            filters,
          )
          .then((response: PaginatedUser) => {
            const { data, ...pagination } = response;
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              usersNotConnectedToAccessLevelPagination: pagination,
              usersNotConnectedToAccessLevel: data,
              areUsersNotConnectedToAccessLevelLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              areUsersNotConnectedToAccessLevelLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const attachAccessLevelToUserAndDevice = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number, userId?: number, deviceId?: number) => {
        service
          .attachAccessLevelToUserAndDevice(accessLevelId, userId, deviceId)
          .then((response: User | Device) => {
            const isUserResponse = 'role' in response;
            if (isUserResponse) {
              set(state.accessLevelAtom, (prev) => ({
                ...prev,
                accessLevel: <AccessLevel>{
                  ...prev.accessLevel,
                  users: {
                    ...(prev?.accessLevel?.users ?? {}),
                    data: [
                      ...((prev?.accessLevel?.users?.data as User[]) ?? []),
                      response,
                    ],
                  },
                },
                usersNotConnectedToAccessLevel:
                  prev.usersNotConnectedToAccessLevel.filter(
                    (user) => user.id !== userId,
                  ),
              }));
              return;
            }

            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel: <AccessLevel>{
                ...prev.accessLevel,
                devices: {
                  ...(prev?.accessLevel?.devices ?? {}),
                  data: [
                    ...((prev?.accessLevel?.devices?.data as Device[]) ?? []),
                    response,
                  ],
                },
              },
              devicesNotConnectedToAccessLevel:
                prev.devicesNotConnectedToAccessLevel.filter(
                  (user) => user.id !== deviceId,
                ),
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const detachAccessLevelFromUserAndDevice = useRecoilCallback(
    ({ set }) =>
      (accessLevelId: number, userId?: number, deviceId?: number) => {
        service
          .detachAccessLevelFromUserAndDevice(accessLevelId, userId, deviceId)
          .then((response: User | Device) => {
            const isUserResponse = 'role' in response;
            if (isUserResponse) {
              set(state.accessLevelAtom, (prev) => ({
                ...prev,
                accessLevel: <AccessLevel>{
                  ...prev.accessLevel,
                  users: {
                    ...(prev?.accessLevel?.users ?? {}),
                    data:
                      prev.accessLevel?.users?.data.filter(
                        (user: User) => user.id !== userId,
                      ) ?? [],
                  },
                },
                usersNotConnectedToAccessLevel: [
                  ...prev.usersNotConnectedToAccessLevel,
                  response,
                ],
              }));
              return;
            }

            set(state.accessLevelAtom, (prev) => ({
              ...prev,
              accessLevel: <AccessLevel>{
                ...prev.accessLevel,
                devices: {
                  ...(prev?.accessLevel?.devices ?? {}),
                  data:
                    prev.accessLevel?.devices?.data.filter(
                      (device: Device) => device.id !== deviceId,
                    ) ?? [],
                },
              },
              devicesNotConnectedToAccessLevel: [
                ...prev.devicesNotConnectedToAccessLevel,
                response,
              ],
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  return {
    attachAccessLevelToUserAndDevice,
    createAccessLevel,
    createAccessLevelException,
    createOrUpdateAccessLevelTimeSchedule,
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
    removeAccessLevelTimeScheduleAccessTime,
    removeException,
    resetAccessLevelState,
    updateAccessLevel,
    updateAccessLevelException,
  };
};

export default useAccessLevelActions;
