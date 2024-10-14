import { Tabs } from '@mantine/core';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Layouts, Navigation } from '@/components';
import { device } from '@/data';
import { ConfigurationIcon, EventIcon, LockIcon, UserIcon } from '@/icons';

import {
  ActionButtons,
  AdditionalInfo,
  Configuration,
  ConnectedUsers,
  DeviceAccess,
  Events,
  General,
} from './components';
import useStyles from './useStyles';

const TABS = {
  CONFIGURATION: {
    ID: 'CONFIGURATION',
    LABEL: 'tabs.devices.configuration',
  },
  CONNECTED_USERS: {
    ID: 'CONNECTED_USERS',
    LABEL: 'tabs.devices.connectedUsers',
  },
  DEVICE_ACCESS: {
    ID: 'DEVICE_ACCESS',
    LABEL: 'tabs.devices.deviceAccess',
  },
  EVENTS: {
    ID: 'EVENTS',
    LABEL: 'tabs.devices.events',
  },
};

const Details = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState(TABS.CONFIGURATION.ID);
  const { getDevice } = device.actions();
  const { device: deviceData } = useRecoilValue(device.state.deviceAtom);

  useEffect(() => {
    if (id) {
      getDevice(id);
    }
  }, [getDevice, id]);

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper
          labels={[t('page.devices.title'), deviceData?.name ?? '']}
          showBackButton
        />
      }
      childrenClassNames={classes.detailsPageLayout}
    >
      <General />
      <AdditionalInfo />
      <Tabs
        value={activeTab}
        onTabChange={(value: string) => setActiveTab(value)}
        className={classes.tabsContainer}
      >
        <Tabs.List>
          <Tabs.Tab
            icon={<ConfigurationIcon size={20} className="configurationIcon" />}
            value={TABS.CONFIGURATION.ID}
          >
            {t(TABS.CONFIGURATION.LABEL)}
          </Tabs.Tab>
          <Tabs.Tab
            icon={<UserIcon size={20} />}
            value={TABS.CONNECTED_USERS.ID}
          >
            {t(TABS.CONNECTED_USERS.LABEL)}
          </Tabs.Tab>
          <Tabs.Tab icon={<LockIcon size={20} />} value={TABS.DEVICE_ACCESS.ID}>
            {t(TABS.DEVICE_ACCESS.LABEL)}
          </Tabs.Tab>
          <Tabs.Tab icon={<EventIcon size={20} />} value={TABS.EVENTS.ID}>
            {t(TABS.EVENTS.LABEL)}
          </Tabs.Tab>
        </Tabs.List>
        {activeTab === TABS.CONFIGURATION.ID && (
          <Tabs.Panel
            className={classes.tabContainer}
            value={TABS.CONFIGURATION.ID}
          >
            <Configuration />
          </Tabs.Panel>
        )}
        {activeTab === TABS.CONNECTED_USERS.ID && (
          <Tabs.Panel
            className={classes.tabContainer}
            value={TABS.CONNECTED_USERS.ID}
          >
            <ConnectedUsers />
          </Tabs.Panel>
        )}
        {activeTab === TABS.DEVICE_ACCESS.ID && (
          <Tabs.Panel
            className={classes.tabContainer}
            value={TABS.DEVICE_ACCESS.ID}
          >
            <DeviceAccess />
          </Tabs.Panel>
        )}
        {activeTab === TABS.EVENTS.ID && (
          <Tabs.Panel className={classes.tabContainer} value={TABS.EVENTS.ID}>
            <Events />
          </Tabs.Panel>
        )}
      </Tabs>
      <ActionButtons />
    </Layouts.Page>
  );
};

export default memo(Details);
