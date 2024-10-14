import { Button, Flex, Modal, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
import { ArrowDownIcon, FilterIcon, NotFoundUserIcon } from '@/icons';

import { pagination } from '@/common/constants';
import { CreateUser, UserType } from '@/common/models';
import { common } from '@/common/utils';

import { Users } from './components';
import useStyles from './useStyles';

const ConnectedUsers = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [
    isNewUserDialogOpened,
    { open: openNewUserDialog, close: closeNewUserDialog },
  ] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination.DEFAULT_PAGE);
  const { getUsersNotConnectedToDevice, createUser } = user.actions();
  const { getDeviceUsers, addUserToDevice } = device.actions();
  const { usersNotConnectedToDevice } = useRecoilValue(user.state.userAtom);
  const { areDeviceUsersLoading } = useRecoilValue(device.state.deviceAtom);

  const handleCreateUser = useCallback(
    (values: CreateUser) => {
      close();
      createUser(values);
    },
    [close, createUser],
  );

  const handleUserToAttachSearch = useCallback(
    (search: string) =>
      getUsersNotConnectedToDevice(
        parseInt(id ?? '0', 10),
        {
          page: pagination.DEFAULT_PAGE,
          pageSize: pagination.DEVICES.USERS_NOT_CONNECTED_TO_DEVICE.PAGE_SIZE,
        },
        { search: search || '-', type: UserType.RESIDENT },
      ),
    [id, getUsersNotConnectedToDevice],
  );

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(pagination.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  useEffect(() => {
    if (id) {
      getDeviceUsers(
        parseInt(id, 10),
        {
          page: currentPage,
          pageSize: pagination.DEVICES.USERS.PAGE_SIZE,
        },
        { search, type: UserType.RESIDENT },
      );
    }
  }, [currentPage, id, search, getDeviceUsers]);

  return (
    <Flex className={classes.connectedUsersContainer}>
      <Flex className={classes.innerContainer}>
        <Flex>
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
              label: 'notFound.users.label',
              description: 'notFound.users.attachUserDescription',
              icon: NotFoundUserIcon,
            }}
            action={handleUserToAttachSearch}
            onItemSelect={(user) =>
              addUserToDevice({ id: parseInt(id ?? '0', 10) }, user.id)
            }
            data={usersNotConnectedToDevice.map((data) => ({
              id: data.id,
              title: common.getUserFullName(data) ?? '-',
              imageUrl: data.imageUrl ?? '-',
              subtitle: data.email,
            }))}
            placeholder="buttons.attachUser"
            classNames={classes.attachUserInput}
          />
        </Flex>
        {areDeviceUsersLoading ? (
          <Flex pos="relative" h="100%">
            <Loaders.Overlay />
          </Flex>
        ) : (
          <Users
            currentPage={currentPage}
            changePage={setCurrentPage}
            openDialog={open}
          />
        )}
      </Flex>
      <Modal
        title={t('dialogs.accessLevels.attachUser.title')}
        size="sm"
        centered
        opened={isDialogOpened}
        onClose={close}
      >
        <AttachMultipleEntities
          search={{
            notFound: {
              label: 'notFound.users.label',
              description: 'notFound.users.attachUserDescription',
              icon: NotFoundUserIcon,
            },
            data: usersNotConnectedToDevice.map((data) => ({
              id: data.id,
              title: common.getUserFullName(data) ?? '-',
              imageUrl: data.imageUrl ?? '-',
              subtitle: data.email,
            })),
            placeholder: 'buttons.attachUser',
          }}
          onSave={(users) => {
            addUserToDevice({ id: parseInt(id ?? '0', 10) }, users[0].id);
            close();
          }}
          handleSearch={handleUserToAttachSearch}
          createNewClick={openNewUserDialog}
        />
      </Modal>
      <Modal
        title={t('wizard.users.title')}
        size="lg"
        centered
        opened={isNewUserDialogOpened}
        onClose={closeNewUserDialog}
      >
        <Wizard.NewUser
          handleClose={closeNewUserDialog}
          handleCreateUser={handleCreateUser}
        />
      </Modal>
    </Flex>
  );
};

export default memo(ConnectedUsers);
