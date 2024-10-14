import { LockStatus } from './configuration';

export enum AccessExceptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export interface AccessException {
  id: number;
  name: string;
  lockStatus: LockStatus;
  startDate: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  applySingleDate: boolean;
  applyWholeDay: boolean;
  applyForNextYear: boolean;
  status: AccessExceptionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AccessLevelAccessException {
  id: number;
  accessExceptionId: number;
  accessException: AccessException;
}
