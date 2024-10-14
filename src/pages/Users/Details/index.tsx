import { Button, Flex, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { ConfirmationDialog, Layouts, Navigation } from '@/components';
import { user } from '@/data';
import { AccessDeviceIcon, EventIcon, UserIcon } from '@/icons';

import { User, UserType } from '@/common/models';
import { common } from '@/common/utils';

import {
  AccessKeys,
  AdditionalInfo,
  ConnectedDevices,
  Events,
  General,
  LastActions,
  Residents,
} from './components';
import useStyles from './useStyles';

const TABS = {
  CONNECTED_DEVICES: {
    ID: 'CONNECTED_DEVICES',
    LABEL: 'tabs.users.connectedDevices',
  },
  RESIDENTS: {
    ID: 'RESIDENTS',
    LABEL: 'tabs.users.residents',
  },
  EVENTS: { ID: 'EVENTS', LABEL: 'tabs.users.events' },
};

const Details = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string>(TABS.CONNECTED_DEVICES.ID);
  const { getResident } = user.actions();
  const { resident } = useRecoilValue(user.state.residentAtom);

  const handleRemoveUser = useCallback(() => {
    close();
  }, [close]);

  useEffect(() => {
    if (id) {
      getResident(id);
    }
  }, [getResident, id]);

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper
          labels={[
            t('page.users.title'),
            common.getUserFullName(resident as User) as string,
          ]}
          showBackButton
        />
      }
      childrenClassNames={classes.detailsPageLayout}
    >
      <General />
      <AdditionalInfo />
      <Flex className={classes.contentContainer}>
        <Flex className={classes.accessInfoContainer}>
          <AccessKeys />
          <LastActions />
        </Flex>
        <Tabs
          defaultValue={TABS.CONNECTED_DEVICES.ID}
          className={classes.tabsContainer}
          onTabChange={(value: string) => setActiveTab(value)}
        >
          <Tabs.List>
            <Tabs.Tab
              icon={<AccessDeviceIcon size={20} />}
              value={TABS.CONNECTED_DEVICES.ID}
            >
              {t(TABS.CONNECTED_DEVICES.LABEL)}
            </Tabs.Tab>
            {resident?.type !== UserType.RESIDENT && (
              <Tabs.Tab icon={<UserIcon size={20} />} value={TABS.RESIDENTS.ID}>
                {t(TABS.RESIDENTS.LABEL)}
              </Tabs.Tab>
            )}
            <Tabs.Tab icon={<EventIcon size={20} />} value={TABS.EVENTS.ID}>
              {t(TABS.EVENTS.LABEL)}
            </Tabs.Tab>
          </Tabs.List>
          {activeTab === TABS.CONNECTED_DEVICES.ID && (
            <Tabs.Panel value={TABS.CONNECTED_DEVICES.ID}>
              <ConnectedDevices />
            </Tabs.Panel>
          )}
          {activeTab === TABS.RESIDENTS.ID &&
            resident?.type !== UserType.RESIDENT && (
              <Tabs.Panel value={TABS.RESIDENTS.ID}>
                <Residents />
              </Tabs.Panel>
            )}
          {activeTab === TABS.EVENTS.ID && (
            <Tabs.Panel value={TABS.EVENTS.ID}>
              <Events />
            </Tabs.Panel>
          )}
        </Tabs>
        <Button
          ml="auto"
          mt={15}
          w="max-content"
          variant="neutral"
          onClick={toggle}
        >
          {t('common.delete')}
        </Button>
      </Flex>
      <ConfirmationDialog
        isOpened={opened}
        positiveButtonText={t('common.confirm')}
        negativeButtonText={t('common.cancel')}
        text={t('dialogs.users.delete.confirmationText')}
        title={t('dialogs.users.delete.confirmationTitle')}
        negativeButtonClick={close}
        positiveButtonClick={handleRemoveUser}
      />
    </Layouts.Page>
  );
};

export default memo(Details);
