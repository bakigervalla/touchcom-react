import { Button, Flex, Tabs, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { uniqBy as _uniqBy } from 'lodash';
import pluralize from 'pluralize';
import React, { Dispatch, memo, useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import {
  ConfirmationDialog,
  InlineEdit,
  Loaders,
  NotFound,
  TimeSchedules,
} from '@/components';
import { accessLevel } from '@/data';
import {
  AccessDeviceIcon,
  CalendarDateIcon,
  CalendarIcon,
  NotFoundAccessLevelIcon,
  UserIcon,
} from '@/icons';

import Menu from '@/components/Menu';

import { AccessLevel } from '@/common/models';

import { Devices, Exceptions, Users } from './components';
import useStyles from './useStyles';

const TABS = {
  DEVICES: { ID: 'DEVICES', LABEL: 'tabs.accessLevels.devices.title' },
  USERS: { ID: 'USERS', LABEL: 'tabs.accessLevels.users.title' },
  TIME_SCHEDULES: {
    ID: 'TIME_SCHEDULES',
    LABEL: 'tabs.accessLevels.timeSchedules.title',
  },
  EXCEPTIONS: { ID: 'EXCEPTIONS', LABEL: 'tabs.accessLevels.exceptions.title' },
};

interface AccessLevelProps {
  data: Partial<AccessLevel> | null;
  isNewAccessLevelCreation: boolean;
  handleCreateAccessLevel: () => void;
  handleNewAccessLevelClick: () => void;
  handleUpdateAccessLevel: (values: Partial<AccessLevel>) => void;
  setNewAccessLevel: Dispatch<React.SetStateAction<Partial<AccessLevel>>>;
}

const AccessLevel = ({
  data,
  isNewAccessLevelCreation,
  handleCreateAccessLevel,
  handleNewAccessLevelClick,
  handleUpdateAccessLevel,
  setNewAccessLevel,
}: AccessLevelProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string>(TABS.DEVICES.ID);
  const {
    getAccessLevel,
    removeAccessLevel,
    getAccessLevelTimeSchedule,
    createOrUpdateAccessLevelTimeSchedule: upsertTimeSchedule,
    removeAccessLevelTimeScheduleAccessTime: removeAccessTime,
  } = accessLevel.actions();
  const {
    accessLevel: accessLevelData,
    isAccessLevelLoading,
    isAccessLevelTimeScheduleLoading,
  } = useRecoilValue(accessLevel.state.accessLevelAtom);

  const handleRemoveAccessLevel = useCallback(() => {
    close();
    removeAccessLevel(data as AccessLevel);
  }, [close, data, removeAccessLevel]);

  useEffect(() => {
    if (data?.id) {
      getAccessLevel(data.id);
    }
  }, [data?.id, getAccessLevel]);

  useEffect(() => {
    if (data?.id && activeTab === TABS.TIME_SCHEDULES.ID) {
      getAccessLevelTimeSchedule(data.id);
    }
  }, [activeTab, data?.id, getAccessLevelTimeSchedule]);

  if (isAccessLevelLoading) {
    return (
      <Flex pos="relative" h="100%">
        <Loaders.Overlay />
      </Flex>
    );
  }

  return accessLevelData || data ? (
    <Flex className={classes.accessLevelContainer}>
      <Flex className={classes.headerContainer}>
        <Menu.ColorPicker
          activeColor={
            isNewAccessLevelCreation
              ? data?.color || ''
              : accessLevelData?.color || ''
          }
          setActiveColor={(value) =>
            isNewAccessLevelCreation
              ? setNewAccessLevel((prev) => ({ ...prev, color: value }))
              : handleUpdateAccessLevel({ ...accessLevelData, color: value })
          }
        />
        <InlineEdit.Input
          value={
            isNewAccessLevelCreation
              ? data?.name || ''
              : accessLevelData?.name || ''
          }
          classNames={{ text: classes.title }}
          placeholder={t('forms.accessLevel.data.placeholders.name')}
          onSetValue={(value) =>
            isNewAccessLevelCreation
              ? setNewAccessLevel((prev) => ({ ...prev, name: value }))
              : handleUpdateAccessLevel({ ...accessLevelData, name: value })
          }
        />
        {isNewAccessLevelCreation ? (
          <Button
            ml="auto"
            className={classes.button}
            onClick={handleCreateAccessLevel}
            disabled={
              !(isNewAccessLevelCreation ? data?.name : accessLevelData?.name)
            }
          >
            {t('common.save')}
          </Button>
        ) : (
          <Button variant="neutral" ml="auto" onClick={toggle}>
            {t('common.delete')}
          </Button>
        )}
      </Flex>
      {!isNewAccessLevelCreation && accessLevelData && (
        <Text className={classes.scheduleInfo}>
          <Trans
            i18nKey="page.accessLevels.description"
            values={{
              devices: accessLevelData.totalDevices,
              deviceText: pluralize(
                t('common.device'),
                accessLevelData.totalDevices,
              ),
              users: accessLevelData.totalUsers,
              userText: pluralize(t('common.user'), accessLevelData.totalUsers),
            }}
          >
            <b>
              {accessLevelData.totalDevices}{' '}
              {pluralize('device', accessLevelData.totalDevices)}
            </b>{' '}
            attached to current access level have access for{' '}
            <b>
              {accessLevelData.totalUsers}{' '}
              {pluralize('user', accessLevelData.totalUsers)}
            </b>{' '}
            between <b>07:00</b> and <b>16:00</b> on <b>Tuesday</b> and{' '}
            <b>Friday</b> except for <b>23/12/2023 - 02/01/2024</b>. You can see
            more information about exceptions in the{' '}
            <b>&quot;Exceptions&quot;</b> tab.
          </Trans>
        </Text>
      )}
      <Tabs
        value={activeTab}
        onTabChange={(value: string) => setActiveTab(value)}
        color={
          isNewAccessLevelCreation
            ? data?.color || ''
            : accessLevelData?.color || ''
        }
        className={classes.tabsContainer}
      >
        <Tabs.List>
          <Tabs.Tab
            icon={<AccessDeviceIcon size={20} />}
            value={TABS.DEVICES.ID}
          >
            {t(TABS.DEVICES.LABEL)}
          </Tabs.Tab>
          <Tabs.Tab icon={<UserIcon size={20} />} value={TABS.USERS.ID}>
            {t(TABS.USERS.LABEL)}
          </Tabs.Tab>
          <Tabs.Tab
            icon={<CalendarIcon size={20} />}
            value={TABS.TIME_SCHEDULES.ID}
          >
            {t(TABS.TIME_SCHEDULES.LABEL)}
          </Tabs.Tab>
          <Tabs.Tab
            icon={<CalendarDateIcon size={20} />}
            value={TABS.EXCEPTIONS.ID}
          >
            {t(TABS.EXCEPTIONS.LABEL)}
          </Tabs.Tab>
        </Tabs.List>
        {activeTab === TABS.DEVICES.ID && (
          <Tabs.Panel className={classes.tabContainer} value={TABS.DEVICES.ID}>
            <Devices
              data={accessLevelData}
              isNewAccessLevelCreation={isNewAccessLevelCreation}
            />
          </Tabs.Panel>
        )}
        {activeTab === TABS.USERS.ID && (
          <Tabs.Panel className={classes.tabContainer} value={TABS.USERS.ID}>
            <Users
              data={accessLevelData}
              isNewAccessLevelCreation={isNewAccessLevelCreation}
            />
          </Tabs.Panel>
        )}
        {activeTab === TABS.TIME_SCHEDULES.ID && (
          <Tabs.Panel
            className={classes.tabContainer}
            value={TABS.TIME_SCHEDULES.ID}
          >
            <Flex className={classes.timeSchedulesContainer}>
              <Flex direction="column" gap={6}>
                <Title order={5}>
                  {t('tabs.accessLevels.timeSchedules.title')}
                </Title>
                <Text variant="subtitle" w="70%">
                  {t('tabs.accessLevels.timeSchedules.subtitle')}
                </Text>
              </Flex>
              <TimeSchedules
                data={accessLevelData}
                upsertData={upsertTimeSchedule}
                removeAccessTime={removeAccessTime}
                disabled={isNewAccessLevelCreation}
                isDataLoading={isAccessLevelTimeScheduleLoading}
              />
            </Flex>
          </Tabs.Panel>
        )}
        {activeTab === TABS.EXCEPTIONS.ID && (
          <Tabs.Panel
            className={classes.tabContainer}
            value={TABS.EXCEPTIONS.ID}
          >
            <Exceptions
              data={accessLevelData}
              isNewAccessLevelCreation={isNewAccessLevelCreation}
            />
          </Tabs.Panel>
        )}
      </Tabs>
      <ConfirmationDialog
        isOpened={opened}
        positiveButtonText={t('common.confirm')}
        negativeButtonText={t('common.cancel')}
        text={t('dialogs.accessLevels.delete.confirmationText')}
        title={t('dialogs.accessLevels.delete.confirmationTitle')}
        negativeButtonClick={close}
        positiveButtonClick={handleRemoveAccessLevel}
      />
    </Flex>
  ) : (
    <Flex className={classes.notFoundContainer}>
      <NotFound
        label="notFound.accessLevel.label"
        description="notFound.accessLevel.description"
        Icon={NotFoundAccessLevelIcon}
      />
      <Button
        variant="neutral"
        className={classes.button}
        onClick={handleNewAccessLevelClick}
        leftIcon={<IconPlus size={18} />}
      >
        {t('page.accessLevels.newAccessLevel')}
      </Button>
    </Flex>
  );
};

export default memo(AccessLevel);
