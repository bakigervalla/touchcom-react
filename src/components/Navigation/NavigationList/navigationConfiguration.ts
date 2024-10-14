import { TFunction } from 'i18next';

import {
  AccessControlIcon,
  AccessDeviceIcon,
  AccessLevelIcon,
  AdministratorIcon,
  BuildingIcon,
  DashboardIcon,
  RoleIcon,
  ScanIcon,
  SettingsIcon,
  UserIcon,
} from '@/icons';

import { paths } from '@/common/constants';
import { NavigationItem } from '@/common/interfaces';

interface NavigationConfiguration {
  common: NavigationItem[];
}

export default (t: TFunction) =>
  <NavigationConfiguration>{
    common: [
      {
        title: t('navigation.items.dashboard'),
        route: paths.DASHBOARD,
        icon: DashboardIcon,
        roles: [],
        subItems: [],
      },
      {
        title: t('navigation.items.siteManagement.title'),
        route: paths.SITES,
        icon: BuildingIcon,
        roles: [],
        subItems: [
          {
            title: t('navigation.items.siteManagement.subItems.accessDevices'),
            route: paths.SITES_DEVICES,
            icon: AccessDeviceIcon,
            roles: [],
          },
          {
            title: t('navigation.items.siteManagement.subItems.users'),
            route: paths.SITES_USERS,
            icon: UserIcon,
            roles: [],
          },
        ],
      },
      {
        title: t('navigation.items.accessControl.title'),
        route: paths.ACCESS_CONTROLS,
        icon: AccessControlIcon,
        roles: [],
        subItems: [
          {
            title: t('navigation.items.accessControl.subItems.accessKeys'),
            route: paths.ACCESS_CONTROLS_KEYS,
            icon: ScanIcon,
            roles: [],
          },
          {
            title: t('navigation.items.accessControl.subItems.accessLevels'),
            route: paths.ACCESS_CONTROLS_LEVELS,
            icon: AccessLevelIcon,
            roles: [],
          },
        ],
      },
      {
        title: t('navigation.items.settings.title'),
        route: paths.SETTINGS,
        icon: SettingsIcon,
        roles: [],
        subItems: [
          {
            title: t('navigation.items.settings.subItems.administrators'),
            route: paths.SETTINGS_ADMINISTRATORS,
            icon: AdministratorIcon,
            roles: [],
          },
          {
            title: t('navigation.items.settings.subItems.roles'),
            route: paths.SETTINGS_ROLES,
            icon: RoleIcon,
            roles: [],
          },
        ],
      },
    ],
  };
