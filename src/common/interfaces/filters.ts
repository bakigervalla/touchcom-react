import {
  AccessKeyStatus,
  DeviceStatus,
  DeviceType,
  SiteStatus,
  UserStatus,
  UserType,
} from '../models';

export interface EventFilterItem {
  id: number;
  key: string;
  label: string;
  value?: number;
}

export interface Filter {
  search?: string;
}

export interface DeviceFilter extends Filter {
  type?: DeviceType;
  status?: DeviceStatus;
}

export interface SiteFilter {
  status?: SiteStatus;
}

export interface AccessKeyFilter extends Filter {
  status?: AccessKeyStatus;
}

export interface UserFilter extends Filter {
  status?: UserStatus;
  type: UserType;
}
