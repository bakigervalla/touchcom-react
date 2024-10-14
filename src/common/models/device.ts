import { AccessControl } from './accessControl';
import { AccessLevel } from './accessLevel';
import { Address } from './address';
import { Configuration } from './configuration';
import { Pagination } from './pagination';
import { Site } from './site';
import { User } from './user';
import { Version } from './version';

export enum DeviceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REGISTRATION_IN_REVIEW = 'REGISTRATION_IN_REVIEW',
}

export enum DeviceType {
  VISITOR_PANEL = 'VISITOR_PANEL',
  DOOR = 'DOOR',
}

export interface Device {
  id: number;
  name: string;
  serialNumber: string;
  description: string;
  imageUrl: string;
  floor: number;
  address: Partial<Address>;
  status: DeviceStatus;
  type: DeviceType;
  site: Site;
  version: Partial<Version>;
  configuration: Partial<Configuration>;
  accessControls: AccessControl[];
  connectedUser?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface DevicesOverview {
  totalDevices: number;
  visitorPanels: number;
  doors: number;
}

export interface CreateDevice extends Partial<Device> {
  credentials?: Pick<User, 'email' | 'password' | 'confirmPassword'>;
}

export class PaginatedDevice extends Pagination {
  data!: Device[];
}

export class PaginatedDeviceUsers extends Pagination {
  data!: (User & { isVisible: boolean; accessGroup: AccessLevel })[];
}
