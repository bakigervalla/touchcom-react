import { AccessTimeSchedule } from './accessTimeSchedule';
import { Pagination } from './pagination';
import { User } from './user';

export enum AccessKeyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AccessKeyType {
  TAG = 'TAG',
  CARD = 'CARD',
  OTHER = 'OTHER',
}

export interface AccessKey {
  id: number;
  tag: string;
  number: string;
  name: string;
  type: AccessKeyType;
  status: AccessKeyStatus;
  belongsTo?: string;
  validFrom?: Date | null;
  validTo?: Date | null;
  pin: string;
  accessTimeScheduleId?: number;
  accessControl: { user: Partial<User>; device: any };
  accessTimeSchedule?: AccessTimeSchedule;
}

export interface AccessKeysOverview {
  totalKeys: number;
  activeKeys: number;
  inactiveKeys: number;
}

export interface UpsertAccessKey extends Partial<AccessKey> {
  user?: Partial<User>;
}

export class PaginatedAccessKey extends Pagination {
  data!: AccessKey[];
}
