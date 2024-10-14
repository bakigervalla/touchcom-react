import { DeviceStatus, DeviceType } from './device';

interface DeviceTypeStatistics {
  total: number;
  type: DeviceType;
}

export interface DeviceInfo {
  total: number;
  status: DeviceStatus;
  deviceTypeStatistics: DeviceTypeStatistics[];
}

export interface Statistics {
  status: DeviceStatus;
  total: number;
  devicesInfo: DeviceInfo[];
  events: any[];
  visitors: any[];
}
