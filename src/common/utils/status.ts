import { mantineTheme } from '@/styles';

import {
  AccessControlStatus,
  DeviceStatus,
  LockStatus,
  SiteStatus,
  UserStatus,
} from '../models';

const getFormattedStatusName = (status: string): string => {
  switch (status) {
    case AccessControlStatus.ACTIVE:
      return 'common.status.active';
    case AccessControlStatus.PENDING:
      return 'common.status.pending';
    case AccessControlStatus.BLOCKED:
      return 'common.status.blocked';
    case DeviceStatus.REGISTRATION_IN_REVIEW:
      return 'common.status.registrationInReview';
    case UserStatus.ACTIVE:
      return 'common.status.active';
    case SiteStatus.ACTIVE:
      return 'common.status.active';
    case SiteStatus.INACTIVE:
      return 'common.status.inactive';
    case SiteStatus.ERROR:
      return 'common.status.error';
    case LockStatus.OPEN:
      return 'common.lockStatus.open';
    case LockStatus.CLOSE:
      return 'common.lockStatus.close';
    case UserStatus.SUSPENDED:
      return 'common.userStatus.suspended';
    default:
      return status.toLowerCase();
  }
};

const getColorByStatus = (status: string): string => {
  switch (status) {
    case AccessControlStatus.ACTIVE:
      return mantineTheme?.theme?.colors?.success?.[4] ?? '';
    case AccessControlStatus.PENDING:
      return mantineTheme?.theme?.colors?.warning?.[5] ?? '';
    case AccessControlStatus.BLOCKED:
      return mantineTheme?.theme?.colors?.danger?.[4] ?? '';
    case DeviceStatus.REGISTRATION_IN_REVIEW:
      return mantineTheme?.theme?.colors?.warning?.[5] ?? '';
    case UserStatus.ACTIVE:
      return mantineTheme?.theme?.colors?.success?.[4] ?? '';
    case SiteStatus.ACTIVE:
      return mantineTheme?.theme?.colors?.success?.[4] ?? '';
    case SiteStatus.INACTIVE:
      return mantineTheme?.theme?.colors?.danger?.[4] ?? '';
    case SiteStatus.ERROR:
      return mantineTheme?.theme?.colors?.danger?.[4] ?? '';
    case UserStatus.SUSPENDED:
      return mantineTheme?.theme?.colors?.danger?.[4] ?? '';
    default:
      return mantineTheme?.theme?.colors?.neutral?.[4] ?? '';
  }
};

const getStatusVariant = (status: string): string => {
  switch (status) {
    case AccessControlStatus.ACTIVE:
      return 'success';
    case AccessControlStatus.PENDING:
      return 'warning';
    case AccessControlStatus.BLOCKED:
      return 'danger';
    case DeviceStatus.REGISTRATION_IN_REVIEW:
      return 'warning';
    case UserStatus.ACTIVE:
      return 'success';
    case UserStatus.BLOCKED:
      return 'danger';
    case LockStatus.OPEN:
      return 'success';
    case LockStatus.CLOSE:
      return 'danger';
    case UserStatus.SUSPENDED:
      return 'danger';
    default:
      return '';
  }
};

export default { getColorByStatus, getFormattedStatusName, getStatusVariant };
