import { Button, Flex, Modal, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { isEmpty as _isEmpty } from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  ConfirmationDialog,
  Input,
  Loaders,
  NotFound,
  Table,
} from '@/components';
import { role, user } from '@/data';
import { ArrowDownIcon, FilterIcon, NotFoundUserIcon } from '@/icons';

import { pagination as paginationConstants } from '@/common/constants';
import { InviteUser, UserType } from '@/common/models';

import columns from './columns';
import { AdminInvite } from './components';
import useStyles from './useStyles';

const List = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [search, setSearch] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [
    isRemoveAdminDialogOpened,
    { open: openRemoveAdminDialog, close: closeRemoveAdminDialog },
  ] = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState(
    paginationConstants.DEFAULT_PAGE,
  );
  const { getAdmins, updateUser, inviteUser, resendUserInvitation } =
    user.actions();
  const { getRoles, getAdminRoles } = role.actions();
  const { users, pagination, areUsersLoading } = useRecoilValue(
    user.state.userAtom,
  );
  const { roles, areRolesLoading, areAdminRolesLoading } = useRecoilValue(
    role.state.roleAtom,
  );

  const handleInviteAdmin = useCallback(
    (values: InviteUser) => {
      inviteUser(values);
      close();
    },
    [close, inviteUser],
  );

  const handleRemoveAdmin = useCallback(() => {
    closeRemoveAdminDialog();
  }, [closeRemoveAdminDialog]);

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(paginationConstants.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  useEffect(() => {
    getAdmins(
      {
        page: currentPage,
        pageSize: paginationConstants.ADMINS.PAGE_SIZE,
      },
      { type: '' as UserType, search },
    );
  }, [search, currentPage, getAdmins]);

  useEffect(() => {
    getRoles({
      page: paginationConstants.DEFAULT_PAGE,
      pageSize: paginationConstants.ROLES.PAGE_SIZE,
    });
  }, [getRoles]);

  useEffect(() => {
    getAdminRoles();
  }, [getAdminRoles]);

  return (
    <Flex className={classes.adminContainer}>
      <Flex className={classes.contentContainer}>
        <Flex>
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
            <Button
              onClick={open}
              rightIcon={<IconPlus size={18} />}
              className={clsx(classes.button, 'create')}
            >
              {t('page.administrators.inviteAdmin')}
            </Button>
          </Flex>
        </Flex>
        {!areUsersLoading && !areRolesLoading && !_isEmpty(users) ? (
          <Table
            page={currentPage}
            enableBulkSelect={false}
            classNames={classes.table}
            pageCount={pagination.pageCount}
            pageSize={pagination.pageSize}
            handlePageChange={setCurrentPage}
            columns={columns(
              navigate,
              classes,
              t,
              roles,
              updateUser,
              openRemoveAdminDialog,
              resendUserInvitation,
            )}
            data={users}
          />
        ) : (
          <Flex className={classes.notFoundContainer}>
            <NotFound
              label="notFound.admins.label"
              description="notFound.admins.description"
              Icon={NotFoundUserIcon}
            />
            <Button
              onClick={open}
              className={classes.button}
              rightIcon={<IconPlus size={18} />}
            >
              {t('page.administrators.inviteAdmin')}
            </Button>
          </Flex>
        )}
      </Flex>
      <Modal
        title={t('page.administrators.inviteAdmin')}
        size="auto"
        centered
        opened={opened}
        onClose={close}
      >
        {areAdminRolesLoading ? (
          <Loaders.Overlay />
        ) : (
          <AdminInvite handleSubmit={handleInviteAdmin} />
        )}
      </Modal>
      <ConfirmationDialog
        isOpened={isRemoveAdminDialogOpened}
        positiveButtonText={t('common.confirm')}
        negativeButtonText={t('common.cancel')}
        text={t('dialogs.administrators.delete.confirmationText')}
        title={t('dialogs.administrators.delete.confirmationTitle')}
        negativeButtonClick={closeRemoveAdminDialog}
        positiveButtonClick={handleRemoveAdmin}
      />
    </Flex>
  );
};

export default memo(List);
