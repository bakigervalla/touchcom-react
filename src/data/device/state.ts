import { atom, selector } from 'recoil';

import { Pagination } from '@/common/models';

import { DeviceState } from './interfaces';

const deviceAtom = atom<DeviceState>({
  key: 'devices',
  default: {
    devices: [],
    device: null,
    deviceUsers: [],
    devicesNotConnectedToUser: [],
    devicesOverview: null,
    isDeviceLoading: false,
    areDevicesLoading: false,
    areDeviceUsersLoading: false,
    isDevicesOverviewLoading: false,
    isDeviceConfigurationLoading: false,
    areDevicesNotConnectedToUserLoading: false,
    pagination: new Pagination(),
    deviceUsersPagination: new Pagination(),
    devicesNotConnectedToUserPagination: new Pagination(),
  },
});

const device = selector({
  key: 'device',
  get: ({ get }) => get(deviceAtom).device,
});

export default { deviceAtom, device };
