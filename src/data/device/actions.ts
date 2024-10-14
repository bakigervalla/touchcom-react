import { useNavigate } from 'react-router-dom';
import { useRecoilCallback } from 'recoil';

import { paths } from '@/common/constants';
import { BackendError } from '@/common/errors';
import {
  ChangePassword,
  DeviceFilter,
  PageOptions,
  UserFilter,
} from '@/common/interfaces';
import {
  AccessLevel,
  Configuration,
  CreateDevice,
  Device,
  DevicesOverview,
  PaginatedDevice,
  PaginatedDeviceUsers,
  User,
} from '@/common/models';

import app from '../app';
import user from '../user';

import { DeviceRegistrationVerification } from './interfaces';
import useDeviceServices from './services';
import state from './state';

const useDeviceActions = () => {
  const navigate = useNavigate();
  const service = useDeviceServices();
  const { showErrorMessage, showSuccessMessage, showWarningMessage } =
    app.actions();

  const getDevicesOverview = useRecoilCallback(
    ({ set }) =>
      () => {
        set(state.deviceAtom, (prev) => ({
          ...prev,
          isDevicesOverviewLoading: true,
        }));
        service
          .getDevicesOverview()
          .then((response: DevicesOverview) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              devicesOverview: response,
              isDevicesOverviewLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              isDevicesOverviewLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getDevices = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions, filters?: DeviceFilter) => {
        set(state.deviceAtom, (prev) => ({
          ...prev,
          areDevicesLoading: true,
        }));
        service
          .getDevices(pageOptions, filters)
          .then((response: PaginatedDevice) => {
            const { data, ...pagination } = response;
            set(state.deviceAtom, (prev) => ({
              ...prev,
              devices: data,
              pagination,
              areDevicesLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              areDevicesLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getDevice = useRecoilCallback(
    ({ set }) =>
      (id: string) => {
        set(state.deviceAtom, (prev) => ({
          ...prev,
          isDeviceLoading: false,
        }));
        service
          .getDevice(id)
          .then((response: Device) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              device: { ...prev.device, ...response },
              isDeviceLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              isDeviceLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getDeviceConfiguration = useRecoilCallback(
    ({ set }) =>
      (id: number) => {
        set(state.deviceAtom, (prev) => ({
          ...prev,
          isDeviceConfigurationLoading: false,
        }));
        service
          .getDeviceConfiguration(id)
          .then((response: Configuration) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              device: { ...prev.device, configuration: response } as Device,
              isDeviceConfigurationLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              isDeviceConfigurationLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const updateDevice = useRecoilCallback(
    ({ set }) =>
      (data: Device) => {
        service
          .createOrUpdateDevice(data)
          .then((response: Device) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              device: { ...prev.device, ...response },
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const registerDevice = useRecoilCallback(
    ({ set }) =>
      (data: CreateDevice) => {
        service
          .registerDevice(data)
          .then((response: Device) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              devices: [...prev.devices, response],
            }));
            showSuccessMessage(
              `Device (${response.name}) registered successfully`,
            );
            navigate(paths.SITES_DEVICES);
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const registrationVerification = useRecoilCallback(
    ({ set }) =>
      (data: DeviceRegistrationVerification) => {
        service
          .registrationVerification(data)
          .then((response: Device) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              device: { ...prev.device, ...response, status: response.status },
            }));
            if (data.isApproved) {
              showSuccessMessage(
                `Device (${response.name}) registered successfully`,
              );
            } else {
              showWarningMessage(
                `Device (${response.name}) registration was rejected`,
              );
              navigate(paths.SITES_DEVICES);
            }
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const activate = useRecoilCallback(
    ({ set }) =>
      (id: number) => {
        service
          .activate(id)
          .then((response: Device) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              device: { ...prev.device, ...response, status: response.status },
            }));
            showSuccessMessage(
              `Device (${response.name}) activated successfully`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const reset = useRecoilCallback(
    ({ set }) =>
      (id: number) => {
        service
          .reset(id)
          .then((response: Device) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              device: { ...prev.device, ...response, status: response.status },
            }));
            showSuccessMessage(`Device (${response.name}) reset successfully`);
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const remove = useRecoilCallback(
    () => (id: number) => {
      service
        .remove(id)
        .then((response: Device) => {
          showSuccessMessage(`Device (${response.name}) removed successfully`);
          navigate(paths.SITES_DEVICES);
        })
        .catch((error: BackendError) => showErrorMessage(error.message));
    },
    [],
  );

  const changeDevicePassword = useRecoilCallback(
    ({ set }) =>
      (id: number, data: ChangePassword) => {
        service
          .changeDevicePassword(id, data)
          .then((response: Device) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              device: { ...prev.device, ...response } as Device,
            }));
            showSuccessMessage(
              `Device (${response.name}) credentials updated successfully`,
            );
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getDeviceUsers = useRecoilCallback(
    ({ set }) =>
      (deviceId: number, pageOptions?: PageOptions, filters?: UserFilter) => {
        set(state.deviceAtom, (prev) => ({
          ...prev,
          areDeviceUsersLoading: true,
        }));
        service
          .getDeviceUsers(deviceId, pageOptions, filters)
          .then((response: PaginatedDeviceUsers) => {
            const { data, ...pagination } = response;
            set(state.deviceAtom, (prev) => ({
              ...prev,
              deviceUsers: data,
              deviceUsersPagination: pagination,
              areDeviceUsersLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              areDeviceUsersLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getDevicesNotConnectedToUser = useRecoilCallback(
    ({ set }) =>
      (userId: number, pageOptions?: PageOptions, filters?: DeviceFilter) => {
        set(state.deviceAtom, (prev) => ({
          ...prev,
          areDevicesNotConnectedToUserLoading: true,
        }));
        service
          .getDevicesNotConnectedToUser(userId, pageOptions, filters)
          .then((response: PaginatedDevice) => {
            const { data, ...pagination } = response;
            set(state.deviceAtom, (prev) => ({
              ...prev,
              devicesNotConnectedToUserPagination: pagination,
              devicesNotConnectedToUser: data,
              areDevicesNotConnectedToUserLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              areDevicesNotConnectedToUserLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const changeUserVisibilityOnDevice = useRecoilCallback(
    ({ set }) =>
      (deviceId: number, userId: number, isVisible: boolean) => {
        service
          .changeUserVisibilityOnDevice(deviceId, userId, isVisible)
          .then(
            (
              response: User & {
                isVisible: boolean;
                accessGroup: AccessLevel;
              },
            ) => {
              set(state.deviceAtom, (prev) => ({
                ...prev,
                deviceUsers:
                  prev.deviceUsers?.filter((deviceUser) =>
                    deviceUser.id === response.id
                      ? { ...deviceUser, response }
                      : deviceUser,
                  ) ?? [],
              }));
            },
          )
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const addUserToDevice = useRecoilCallback(
    ({ set }) =>
      (device: Partial<Device>, userId: number) => {
        service
          .addUserToDevice(device.id as number, userId)
          .then(
            (
              response: User & { isVisible: boolean; accessGroup: AccessLevel },
            ) => {
              const deviceId = device.id;
              set(user.state.userAtom, (prev) => ({
                ...prev,
                userDevices: [
                  ...(prev.userDevices ?? []),
                  device as Device & { isVisible: boolean },
                ],
                usersNotConnectedToDevice:
                  prev.usersNotConnectedToDevice.filter(
                    (user) => user.id !== response.id,
                  ),
              }));
              set(state.deviceAtom, (prev) => ({
                ...prev,
                deviceUsers: [...(prev.deviceUsers ?? []), response],
                devicesNotConnectedToUser:
                  prev.devicesNotConnectedToUser.filter(
                    (device) => device.id !== deviceId,
                  ),
              }));
            },
          )
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const removeUserFromDevice = useRecoilCallback(
    ({ set }) =>
      (device: Partial<Device>, userId: number) => {
        service
          .removeUserFromDevice(device.id as number, userId)
          .then(
            (
              response: User & { isVisible: boolean; accessGroup: AccessLevel },
            ) => {
              const deviceId = device.id;
              set(user.state.userAtom, (prev) => ({
                ...prev,
                userDevices:
                  prev.userDevices?.filter(
                    (userDevice) => userDevice.id !== deviceId,
                  ) ?? [],
                usersNotConnectedToDevice: [
                  ...prev.usersNotConnectedToDevice,
                  response,
                ],
              }));
              set(state.deviceAtom, (prev) => ({
                ...prev,
                deviceUsers:
                  prev.deviceUsers?.filter(
                    (deviceUser) => deviceUser.id !== response.id,
                  ) ?? [],
                devicesNotConnectedToUser: [
                  ...prev.devicesNotConnectedToUser,
                  device as Device & { isVisible: boolean },
                ],
              }));
            },
          )
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const changeImage = useRecoilCallback(
    ({ set }) =>
      (image: File, deviceId: number) => {
        service
          .changeImage(image, deviceId)
          .then((response: Device) => {
            set(state.deviceAtom, (prev) => ({
              ...prev,
              device: { ...prev.device, ...response },
              devices: prev.devices.map((site) =>
                site.id === deviceId ? { ...site, ...response } : site,
              ),
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  return {
    activate,
    addUserToDevice,
    changeDevicePassword,
    changeImage,
    changeUserVisibilityOnDevice,
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
    updateDevice,
  };
};

export default useDeviceActions;
