import { Device, Pagination, Response, User } from '@/common/models';

export interface UserState extends Response {
  users: User[];
  user: User | null;
  userResidents: User[];
  usersNotConnectedToDevice: User[];
  residentsNotConnectedToUser: User[];
  userDevices: (Device & { isVisible: boolean })[] | null;
  pagination: Pagination;
  userDevicesPagination: Pagination;
  userResidentsPagination: Pagination;
  usersNotConnectedToDevicePagination: Pagination;
  residentsNotConnectedToUserPagination: Pagination;
  isUserLoading: boolean;
  areUsersLoading: boolean;
  areUserDevicesLoading: boolean;
  areUserResidentsLoading: boolean;
  areUsersNotConnectedToDeviceLoading: boolean;
  areResidentsNotConnectedToUserLoading: boolean;
}
