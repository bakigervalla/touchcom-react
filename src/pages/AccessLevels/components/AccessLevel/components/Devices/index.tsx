import { Button, Flex, Modal, Text, Title, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { uniqBy as _uniqBy } from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import {
  AttachEntitySearch,
  AttachMultipleEntities,
  Input,
  Loaders,
  Wizard,
} from '@/components';
import { accessLevel, device } from '@/data';
import { ArrowDownIcon, FilterIcon, NotFoundDeviceIcon } from '@/icons';

import { pagination } from '@/common/constants';
import { AccessLevel, CreateDevice } from '@/common/models';
import { common } from '@/common/utils';

import { List } from './components';
import useStyles from './useStyles';

interface DevicesProps {
  data: Partial<AccessLevel> | null;
  isNewAccessLevelCreation: boolean;
}

const Devices = ({ data, isNewAccessLevelCreation }: DevicesProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [
    isNewDeviceDialogOpened,
    { open: openNewDeviceDialog, close: closeNewDeviceDialog },
  ] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination.DEFAULT_PAGE);
  const {
    getAccessLevelDevices,
    getDevicesNotConnectedToAccessLevel,
    attachAccessLevelToUserAndDevice,
  } = accessLevel.actions();
  const { registerDevice } = device.actions();
  const {
    accessLevel: accessLevelData,
    devicesNotConnectedToAccessLevel,
    areAccessLevelDevicesLoading,
  } = useRecoilValue(accessLevel.state.accessLevelAtom);

  const handleCreateDevice = useCallback(
    (values: CreateDevice) => {
      closeNewDeviceDialog();
      registerDevice(values);
    },
    [closeNewDeviceDialog, registerDevice],
  );

  const handleDeviceToAttachSearch = useCallback(
    (search: string) => {
      if (data?.id) {
        getDevicesNotConnectedToAccessLevel(
          data.id,
          {
            page: pagination.DEFAULT_PAGE,
            pageSize:
              pagination.ACCESS_LEVELS.DEVICES_NOT_CONNECTED_TO_ACCESS_LEVEL
                .PAGE_SIZE,
          },
          { search: search || '-' },
        );
      }
    },
    [data?.id, getDevicesNotConnectedToAccessLevel],
  );

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(pagination.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  useEffect(() => {
    if (data?.id) {
      getAccessLevelDevices(
        data.id,
        {
          page: currentPage,
          pageSize: pagination.ACCESS_LEVELS.DEVICES.PAGE_SIZE,
        },
        { search },
      );
    }
  }, [currentPage, data?.id, search, getAccessLevelDevices]);

  return (
    <Flex className={classes.devicesContainer}>
      <Flex direction="column" gap={6}>
        <Title order={5}>{t('tabs.accessLevels.devices.title')}</Title>
        <Text variant="subtitle" w="70%">
          {t('tabs.accessLevels.devices.subtitle')}
        </Text>
      </Flex>
      <Flex className={classes.contentContainer}>
        <Flex className={classes.actionsContainer}>
          <Input.Search action={handleSearch} />
          <Button
            variant="filter"
            className={clsx(classes.button, 'filter')}
            leftIcon={<FilterIcon size={18} />}
            rightIcon={<ArrowDownIcon size={16} />}
          >
            {t('common.filter')}
          </Button>
          <AttachEntitySearch
            notFound={{
              label: 'notFound.devices.label',
              description: 'notFound.devices.attachDeviceDescription',
              icon: NotFoundDeviceIcon,
            }}
            action={handleDeviceToAttachSearch}
            onItemSelect={(device) =>
              attachAccessLevelToUserAndDevice(
                accessLevelData?.id ?? 0,
                undefined,
                device.id,
              )
            }
            data={devicesNotConnectedToAccessLevel.map((data) => ({
              id: data.id,
              title: data.name,
              imageUrl: data.imageUrl ?? '-',
              subtitle: common.getFormattedAddress(data.site),
            }))}
            placeholder="buttons.attachDevice"
            classNames={classes.attachDeviceInput}
          />
        </Flex>
        {areAccessLevelDevicesLoading ? (
          <Flex pos="relative" h="100%">
            <Loaders.Overlay />
          </Flex>
        ) : (
          <List
            isNewAccessLevelCreation={isNewAccessLevelCreation}
            currentPage={currentPage}
            changePage={setCurrentPage}
            openDialog={open}
          />
        )}
      </Flex>
      <Modal
        title={t('dialogs.accessLevels.attachDevice.title')}
        size="sm"
        centered
        opened={isDialogOpened}
        onClose={close}
      >
        <AttachMultipleEntities
          search={{
            notFound: {
              label: 'notFound.devices.label',
              description: 'notFound.devices.attachDeviceDescription',
              icon: NotFoundDeviceIcon,
            },
            data: devicesNotConnectedToAccessLevel.map((data) => ({
              id: data.id,
              title: data.name,
              imageUrl: data.imageUrl ?? '-',
              subtitle: common.getFormattedAddress(data.site),
            })),
            placeholder: 'buttons.attachDevice',
          }}
          onSave={(devices) => {
            attachAccessLevelToUserAndDevice(
              accessLevelData?.id ?? 0,
              undefined,
              devices[0].id,
            );
            close();
          }}
          handleSearch={handleDeviceToAttachSearch}
          createNewClick={openNewDeviceDialog}
        />
      </Modal>
      <Modal
        title={t('wizard.devices.title')}
        size="lg"
        centered
        opened={isNewDeviceDialogOpened}
        onClose={closeNewDeviceDialog}
      >
        <Wizard.NewDevice
          handleClose={closeNewDeviceDialog}
          handleCreateDevice={handleCreateDevice}
        />
      </Modal>
    </Flex>
  );
};

export default memo(Devices);
