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
import { user } from '@/data';
import { ArrowDownIcon, FilterIcon, NotFoundUserIcon } from '@/icons';

import { pagination } from '@/common/constants';
import { CreateUser, UserType } from '@/common/models';
import { common } from '@/common/utils';

import { Users } from './components';
import useStyles from './useStyles';

const Residents = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [
    isNewResidentDialogOpened,
    { open: openNewDeviceDialog, close: closeNewResidentDialog },
  ] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination.DEFAULT_PAGE);
  const {
    getUserResidents,
    getResidentsNotConnectedToUser,
    createUser,
    updateUser,
  } = user.actions();
  const { resident } = useRecoilValue(user.state.residentAtom);
  const { areUserResidentsLoading, residentsNotConnectedToUser } =
    useRecoilValue(user.state.userAtom);

  const handleCreateUser = useCallback(
    (values: CreateUser) => {
      closeNewResidentDialog();
      createUser(values);
    },
    [closeNewResidentDialog, createUser],
  );

  const handleDeviceToAttachSearch = useCallback(
    (search: string) =>
      getResidentsNotConnectedToUser(
        parseInt(id ?? '0', 10),
        resident?.type as UserType,
        {
          page: pagination.DEFAULT_PAGE,
          pageSize:
            pagination.USERS.RESIDENTS_NOT_CONNECTED_TO_COMPANY_OR_APARTMENT
              .PAGE_SIZE,
        },
        { search: search || '-', type: UserType.RESIDENT },
      ),
    [id, resident, getResidentsNotConnectedToUser],
  );

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(pagination.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  useEffect(() => {
    if (id) {
      getUserResidents(
        parseInt(id, 10),
        resident?.type as UserType,
        {
          page: currentPage,
          pageSize: pagination.USERS.RESIDENTS.PAGE_SIZE,
        },
        { search, type: UserType.RESIDENT },
      );
    }
  }, [currentPage, id, resident, search, getUserResidents]);

  return (
    <Flex className={classes.residentsContainer}>
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
              label: 'notFound.users.label',
              description: 'notFound.users.attachUserDescription',
              icon: NotFoundUserIcon,
            }}
            action={handleDeviceToAttachSearch}
            onItemSelect={(user) =>
              updateUser({
                id: user?.id,
                ...(resident?.type === UserType.APARTMENT
                  ? { apartmentId: parseInt(id ?? '0', 10) }
                  : { companyId: parseInt(id ?? '0', 10) }),
              })
            }
            data={residentsNotConnectedToUser.map((data) => ({
              ...data,
              id: data.id,
              title: common.getUserFullName(data) ?? '-',
              imageUrl: data.imageUrl ?? '-',
              subtitle: data.email,
            }))}
            placeholder="buttons.attachUser"
            classNames={classes.attachUserInput}
          />
        </Flex>
        {areUserResidentsLoading ? (
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
            data: residentsNotConnectedToUser.map((data) => ({
              ...data,
              id: data.id,
              title: common.getUserFullName(data) ?? '-',
              imageUrl: data.imageUrl ?? '-',
              subtitle: data.email,
            })),
            placeholder: 'buttons.attachUser',
          }}
          onSave={(users) => {
            updateUser({
              id: users[0]?.id,
              ...(resident?.type === UserType.APARTMENT
                ? { apartmentId: parseInt(id ?? '0', 10) }
                : { companyId: parseInt(id ?? '0', 10) }),
            });
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
        opened={isNewResidentDialogOpened}
        onClose={closeNewResidentDialog}
      >
        <Wizard.NewUser
          handleClose={closeNewResidentDialog}
          handleCreateUser={handleCreateUser}
        />
      </Modal>
    </Flex>
  );
};

export default memo(Residents);
