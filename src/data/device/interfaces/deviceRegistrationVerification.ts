import { Device, User } from '@/common/models';

export interface DeviceRegistrationVerification {
  user?: User | null;
  device: Device;
  isApproved: boolean;
}
