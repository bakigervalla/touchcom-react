import {
  AccessLevel,
  Device,
  DevicesOverview,
  Pagination,
  User,
} from '@/common/models';

export interface DeviceState {
  devices: Device[];
  device: Device | null;
  devicesOverview: DevicesOverview | null;
  deviceUsers:
    | (User & { isVisible: boolean; accessGroup: AccessLevel })[]
    | null;
  devicesNotConnectedToUser: Device[];
  isDeviceLoading: boolean;
  areDevicesLoading: boolean;
  areDeviceUsersLoading: boolean;
  isDevicesOverviewLoading: boolean;
  isDeviceConfigurationLoading: boolean;
  areDevicesNotConnectedToUserLoading: boolean;
  pagination: Pagination;
  deviceUsersPagination: Pagination;
  devicesNotConnectedToUserPagination: Pagination;
}
