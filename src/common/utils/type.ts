import { mantineTheme } from '@/styles';

import { AccessKeyType, DeviceType, PermissionType, UserType } from '../models';

const getFormattedTypeName = (type: string): string => {
  switch (type) {
    case AccessKeyType.CARD:
      return 'common.accessKeyType.card';
    case AccessKeyType.TAG:
      return 'common.accessKeyType.tag';
    case AccessKeyType.OTHER:
      return 'common.accessKeyType.other';
    case DeviceType.DOOR:
      return 'common.deviceType.door';
    case DeviceType.VISITOR_PANEL:
      return 'common.deviceType.visitorPanel';
    case PermissionType.ACCESS:
      return 'common.permissionType.auth';
    case PermissionType.USER:
      return 'common.permissionType.user';
    case PermissionType.SITE:
      return 'common.permissionType.site';
    case PermissionType.EVENT:
      return 'common.permissionType.event';
    case PermissionType.DEVICE:
      return 'common.permissionType.device';
    case PermissionType.DEVICE_EVENT:
      return 'common.permissionType.deviceEvents';
    case PermissionType.ACCESS_KEY:
      return 'common.permissionType.accessKey';
    case PermissionType.ACCESS_GROUP:
      return 'common.permissionType.accessLevel';
    case PermissionType.CALL:
      return 'common.permissionType.call';
    case PermissionType.ADMIN_AND_ROLE:
      return 'common.permissionType.adminAndRole';
    case UserType.RESIDENT:
      return 'common.userType.resident';
    case UserType.APARTMENT:
      return 'common.userType.apartment';
    case UserType.COMPANY:
      return 'common.userType.company';
    default:
      return type.toLowerCase();
  }
};

const getColorByType = (status: string): string => {
  switch (status) {
    case DeviceType.DOOR:
      return mantineTheme?.theme?.colors?.info?.[5] ?? '';
    case DeviceType.VISITOR_PANEL:
      return mantineTheme?.theme?.colors?.warning?.[5] ?? '';
    default:
      return mantineTheme?.theme?.colors?.neutral?.[5] ?? '';
  }
};

const getTypeVariant = (type: string): string => {
  switch (type) {
    case AccessKeyType.CARD:
      return 'primary-outlined';
    case AccessKeyType.TAG:
      return 'secondary-outlined';
    case DeviceType.DOOR:
      return 'info';
    case DeviceType.VISITOR_PANEL:
      return 'warning-outlined';
    case UserType.RESIDENT:
      return '';
    case UserType.APARTMENT:
      return 'secondary';
    case UserType.COMPANY:
      return 'primary';
    default:
      return '';
  }
};

export default { getFormattedTypeName, getTypeVariant, getColorByType };
