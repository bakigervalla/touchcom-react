import { Button, Flex, Modal, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { uniqBy as _uniqBy } from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  AttachEntitySearch,
  AttachMultipleEntities,
  Input,
  Loaders,
  Wizard,
} from '@/components';
import { device, user } from '@/data';
import { ArrowDownIcon, FilterIcon, NotFoundDeviceIcon } from '@/icons';

import { pagination } from '@/common/constants';
import { CreateDevice, Device } from '@/common/models';
import { common } from '@/common/utils';

import { Devices } from './components';
import useStyles from './useStyles';

const ConnectedDevices = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [
    isNewDeviceDialogOpened,
    { open: openNewDeviceDialog, close: closeNewDeviceDialog },
  ] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination.DEFAULT_PAGE);
  const { getDevicesNotConnectedToUser, addUserToDevice, registerDevice } =
    device.actions();
  const { getUserDevices } = user.actions();
  const { devicesNotConnectedToUser } = useRecoilValue(device.state.deviceAtom);
  const { areUserDevicesLoading } = useRecoilValue(user.state.userAtom);

  const handleCreateDevice = useCallback(
    (values: CreateDevice) => {
      closeNewDeviceDialog();
      registerDevice(values);
    },
    [closeNewDeviceDialog, registerDevice],
  );

  const handleDeviceToAttachSearch = useCallback(
    (search: string) =>
      getDevicesNotConnectedToUser(
        parseInt(id ?? '0', 10),
        {
          page: pagination.DEFAULT_PAGE,
          pageSize: pagination.USERS.DEVICES_NOT_CONNECTED_TO_USER.PAGE_SIZE,
        },
        { search: search || '-' },
      ),
    [id, getDevicesNotConnectedToUser],
  );

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(pagination.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  useEffect(() => {
    if (id) {
      getUserDevices(
        parseInt(id, 10),
        {
          page: currentPage,
          pageSize: pagination.USERS.DEVICES.PAGE_SIZE,
        },
        { search },
      );
    }
  }, [currentPage, id, search, getUserDevices]);

  return (
    <Flex className={classes.connectedDevicesContainer}>
      <Flex className={classes.innerContainer}>
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
              addUserToDevice(
                device as Partial<Device>,
                parseInt(id ?? '0', 10),
              )
            }
            data={devicesNotConnectedToUser.map((data) => ({
              ...data,
              id: data.id,
              title: data.name,
              imageUrl: data.imageUrl ?? '-',
              subtitle: common.getFormattedAddress(data.site),
            }))}
            placeholder="buttons.attachDevice"
            classNames={classes.attachDeviceInput}
          />
        </Flex>
        {areUserDevicesLoading ? (
          <Flex pos="relative" h="100%">
            <Loaders.Overlay />
          </Flex>
        ) : (
          <Devices
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
            data: devicesNotConnectedToUser.map((data) => ({
              ...data,
              id: data.id,
              title: data.name,
              imageUrl: data.imageUrl ?? '-',
              subtitle: common.getFormattedAddress(data.site),
            })),
            placeholder: 'buttons.attachDevice',
          }}
          onSave={(devices) => {
            addUserToDevice(
              devices[0] as Partial<Device>,
              parseInt(id ?? '0', 10),
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

export default memo(ConnectedDevices);
