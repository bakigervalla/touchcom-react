import { AccessLevelAccessException } from './accessException';
import { AccessTimeSchedule } from './accessTimeSchedule';
import { Pagination } from './pagination';

export enum AccessLevelStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class PaginatedAccessLevelDevices extends Pagination {
  data!: any[];
}

export class PaginatedAccessLevelUsers extends Pagination {
  data!: any[];
}

export class PaginatedAccessLevelExceptions extends Pagination {
  data!: AccessLevelAccessException[];
}

export interface AccessLevel {
  id: number;
  name: string;
  color: string;
  status: AccessLevelStatus;
  accessTimeSchedule?: AccessTimeSchedule;
  accessTimeScheduleId?: number;
  accessExceptions: PaginatedAccessLevelExceptions;
  accessControls: any[];
  devices?: PaginatedAccessLevelDevices;
  users?: PaginatedAccessLevelUsers;
  totalDevices: number;
  totalUsers: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PaginatedAccessLevel extends Pagination {
  data!: AccessLevel[];
}
