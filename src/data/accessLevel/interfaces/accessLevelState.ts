import {
  AccessLevel,
  AccessLevelAccessException,
  Device,
  Pagination,
  User,
} from '@/common/models';

export class PaginatedAccessLevelDevices extends Pagination {
  data!: Device[];
}

export class PaginatedAccessLevelUsers extends Pagination {
  data!: User[];
}

export class PaginatedAccessLevelExceptions extends Pagination {
  data!: AccessLevelAccessException[];
}

export interface AccessLevelState {
  accessLevels: AccessLevel[];
  accessLevel: AccessLevel | null;
  usersNotConnectedToAccessLevel: User[];
  devicesNotConnectedToAccessLevel: Device[];
  pagination: Pagination;
  usersNotConnectedToAccessLevelPagination: Pagination;
  devicesNotConnectedToAccessLevelPagination: Pagination;
  isAccessLevelLoading: boolean;
  areAccessLevelsLoading: boolean;
  areAccessLevelDevicesLoading: boolean;
  areAccessLevelUsersLoading: boolean;
  areAccessLevelExceptionsLoading: boolean;
  isAccessLevelTimeScheduleLoading: boolean;
  areUsersNotConnectedToAccessLevelLoading: boolean;
  areDevicesNotConnectedToAccessLevelLoading: boolean;
}
