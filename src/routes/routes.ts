import {
  AccessKeys,
  AccessLevels,
  Administrators,
  Auth,
  Dashboard,
  Devices,
  Roles,
  Settings,
  Sites,
  Users,
} from '@/pages';

import paths from '@/common/constants/paths';
import { Route } from '@/common/interfaces';

const data: Route[] = [
  {
    name: 'routes.login',
    path: paths.LOGIN,
    component: Auth.Login,
    isProtected: false,
  },
  {
    name: 'routes.passwordRecoveryRequest',
    path: paths.PASSWORD_RECOVERY_REQUEST,
    component: Auth.PasswordRecovery.Request,
    isProtected: false,
  },
  {
    name: 'routes.passwordRecoveryVerification',
    path: paths.PASSWORD_RECOVERY_VERIFICATION,
    component: Auth.PasswordRecovery.Verification,
    isProtected: false,
  },
  {
    name: 'routes.invitationVerification',
    path: paths.INVITATION_VERIFICATION,
    component: Auth.Invitation.Verification,
    isProtected: false,
  },
  {
    name: 'routes.dashboard',
    path: paths.DASHBOARD,
    component: Dashboard,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.sites',
    path: paths.SITES,
    component: Sites.List,
    isProtected: true,
    roles: [],
    hideMenu: true,
  },
  {
    name: 'routes.users',
    path: paths.SITES_USERS,
    component: Users.List,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.userDetails',
    path: paths.SITES_USERS_ID,
    component: Users.Details,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.devices',
    path: paths.SITES_DEVICES,
    component: Devices.List,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.deviceDetails',
    path: paths.SITES_DEVICES_ID,
    component: Devices.Details,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.accessKeys',
    path: paths.ACCESS_CONTROLS_KEYS,
    component: AccessKeys,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.accessLevels',
    path: paths.ACCESS_CONTROLS_LEVELS,
    component: AccessLevels,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.settings',
    path: paths.SETTINGS,
    component: Settings,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.roles',
    path: paths.SETTINGS_ROLES,
    component: Roles,
    isProtected: true,
    roles: [],
  },
  {
    name: 'routes.administrators',
    path: paths.SETTINGS_ADMINISTRATORS,
    component: Administrators,
    isProtected: true,
    roles: [],
  },
];

export default {
  data,
};
