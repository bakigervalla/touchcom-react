import { AccessKey } from './accessKey';
import { AccessLevel } from './accessLevel';
import { User } from './user';

export enum AccessControlStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
}

export interface AccessControl {
  id: number;
  user?: User;
  status: AccessControlStatus;
  accessKey: AccessKey;
  accessGroup: AccessLevel;
  accessGroupId?: number;
  device: any;
  deviceId?: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}
