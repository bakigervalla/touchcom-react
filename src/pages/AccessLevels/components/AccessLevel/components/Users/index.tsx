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
import { accessLevel, user } from '@/data';
import { ArrowDownIcon, FilterIcon, NotFoundUserIcon } from '@/icons';

import { pagination } from '@/common/constants';
import { AccessLevel, CreateUser, UserType } from '@/common/models';
import { common } from '@/common/utils';

import { List } from './components';
import useStyles from './useStyles';

interface UsersProps {
  data: Partial<AccessLevel> | null;
  isNewAccessLevelCreation: boolean;
}

const Users = ({ data, isNewAccessLevelCreation }: UsersProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [
    isNewUserDialogOpened,
    { open: openNewUserDialog, close: closeNewUserDialog },
  ] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination.DEFAULT_PAGE);
  const {
    getAccessLevelUsers,
    getUsersNotConnectedToAccessLevel,
    attachAccessLevelToUserAndDevice,
  } = accessLevel.actions();
  const { createUser } = user.actions();
  const {
    accessLevel: accessLevelData,
    usersNotConnectedToAccessLevel,
    areAccessLevelUsersLoading,
  } = useRecoilValue(accessLevel.state.accessLevelAtom);

  const handleCreateUser = useCallback(
    (values: CreateUser) => {
      closeNewUserDialog();
      createUser(values);
    },
    [closeNewUserDialog, createUser],
  );

  const handleUserToAttachSearch = useCallback(
    (search: string) => {
      if (data?.id) {
        getUsersNotConnectedToAccessLevel(
          data.id,
          {
            page: pagination.DEFAULT_PAGE,
            pageSize:
              pagination.ACCESS_LEVELS.USERS_NOT_CONNECTED_TO_ACCESS_LEVEL
                .PAGE_SIZE,
          },
          { search: search || '-', type: UserType.RESIDENT },
        );
      }
    },
    [data?.id, getUsersNotConnectedToAccessLevel],
  );

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(pagination.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  useEffect(() => {
    if (data?.id) {
      getAccessLevelUsers(
        data.id,
        {
          page: currentPage,
          pageSize: pagination.ACCESS_LEVELS.USERS.PAGE_SIZE,
        },
        { search, type: UserType.RESIDENT },
      );
    }
  }, [currentPage, data?.id, search, getAccessLevelUsers]);

  return (
    <Flex className={classes.usersContainer}>
      <Flex direction="column" gap={6}>
        <Title order={5}>{t('tabs.accessLevels.users.title')}</Title>
        <Text variant="subtitle" w="70%">
          {t('tabs.accessLevels.users.subtitle')}
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
              label: 'notFound.users.label',
              description: 'notFound.users.attachUserDescription',
              icon: NotFoundUserIcon,
            }}
            action={handleUserToAttachSearch}
            onItemSelect={(user) =>
              attachAccessLevelToUserAndDevice(
                accessLevelData?.id ?? 0,
                user.id,
                undefined,
              )
            }
            data={usersNotConnectedToAccessLevel.map((data) => ({
              id: data.id,
              title: common.getUserFullName(data) ?? '-',
              imageUrl: data.imageUrl ?? '-',
              subtitle: data.email,
            }))}
            placeholder="buttons.attachUser"
            classNames={classes.attachUserInput}
          />
        </Flex>
        {areAccessLevelUsersLoading ? (
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
            data: usersNotConnectedToAccessLevel.map((data) => ({
              id: data.id,
              title: common.getUserFullName(data) ?? '-',
              imageUrl: data.imageUrl ?? '-',
              subtitle: data.email,
            })),
            placeholder: 'buttons.attachUser',
          }}
          onSave={(users) => {
            attachAccessLevelToUserAndDevice(
              accessLevelData?.id ?? 0,
              users[0].id,
              undefined,
            );
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

export default memo(Users);
