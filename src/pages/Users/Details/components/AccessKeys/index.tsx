import { Flex, Modal, Pagination, Title, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { AttachMultipleEntities, Loaders } from '@/components';
import { accessKey } from '@/data';
import { ArrowDownIcon, NotFoundAccessKeyIcon } from '@/icons';

import { AccessKeyForm } from '@/pages/AccessKeys/Shared';

import { pagination } from '@/common/constants';
import { AccessKey as IAccessKey } from '@/common/models';

import List from './List';
import useStyles from './useStyles';

const AccessKeys = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [
    isNewAccessKeyDialogOpened,
    { open: openNewAccessKeyDialog, close: closeNewAccessKeyDialog },
  ] = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState(pagination.DEFAULT_PAGE);
  const {
    createAccessKey,
    getUserAccessKeys,
    attachAccessKeyToUserAndDevice,
    getAccessKeysNotConnectedToUser,
  } = accessKey.actions();
  const {
    userAccessKeysPagination,
    areUserAccessKeysLoading,
    accessKeysNotConnectedToUser,
  } = useRecoilValue(accessKey.state.accessKeyAtom);

  const handleCreateAccessKey = useCallback(
    (values: Partial<IAccessKey>) => {
      closeNewAccessKeyDialog();
      createAccessKey(values);
    },
    [closeNewAccessKeyDialog, createAccessKey],
  );

  const handleAccessKeyToAttachSearch = useCallback(
    (search: string) =>
      getAccessKeysNotConnectedToUser(
        parseInt(id ?? '0', 10),
        {
          page: pagination.DEFAULT_PAGE,
          pageSize:
            pagination.USERS.ACCESS_KEYS_NOT_CONNECTED_TO_USER.PAGE_SIZE,
        },
        { search: search || '-' },
      ),
    [id, getAccessKeysNotConnectedToUser],
  );

  useEffect(() => {
    if (id) {
      getUserAccessKeys(parseInt(id, 10), {
        page: currentPage,
        pageSize: pagination.USERS.ACCESS_KEYS.PAGE_SIZE,
      });
    }
  }, [currentPage, id, getUserAccessKeys]);

  return (
    <Flex className={classes.accessKeysContainer}>
      <Flex align="center">
        <Title order={5}>{t('page.users.accessKeys')}</Title>
        <Flex
          ml="auto"
          gap={14}
          display={
            userAccessKeysPagination.pageCount <= 1 ? 'none !important' : 'flex'
          }
        >
          <Pagination.Root
            radius="xl"
            total={userAccessKeysPagination.pageCount}
            value={currentPage}
            defaultValue={pagination.DEFAULT_PAGE}
            onChange={setCurrentPage}
          >
            <Pagination.Previous
              icon={ArrowDownIcon}
              className={clsx(classes.pagination, 'previous')}
            />
            <Pagination.Next
              icon={ArrowDownIcon}
              className={clsx(classes.pagination, 'next')}
            />
          </Pagination.Root>
        </Flex>
      </Flex>
      {areUserAccessKeysLoading ? (
        <Flex pos="relative" h="100%">
          <Loaders.Overlay />
        </Flex>
      ) : (
        <List
          openAddKeyDialog={open}
          handleAccessKeyToAttachSearch={handleAccessKeyToAttachSearch}
        />
      )}
      <Modal
        title={t('dialogs.users.attachAccessKey.title')}
        size="sm"
        centered
        opened={isDialogOpened}
        onClose={close}
      >
        <AttachMultipleEntities
          search={{
            notFound: {
              label: 'notFound.keys.label',
              description: 'notFound.keys.attachKeyDescription',
              icon: NotFoundAccessKeyIcon,
            },
            data: accessKeysNotConnectedToUser.map((data) => ({
              ...data,
              id: data.id,
              title: data.name,
              imageUrl: '-',
              subtitle: data.tag,
            })),
            placeholder: 'buttons.attachAccessKey',
          }}
          onSave={(accessKeys) => {
            attachAccessKeyToUserAndDevice(
              (accessKeys[0] as Partial<IAccessKey>)?.id ?? 0,
              parseInt(id ?? '0', 10),
            );
            close();
          }}
          handleSearch={handleAccessKeyToAttachSearch}
          createNewClick={openNewAccessKeyDialog}
        />
      </Modal>
      <Modal
        title={t('page.accessKeys.createAccessKey')}
        size="auto"
        centered
        opened={isNewAccessKeyDialogOpened}
        onClose={closeNewAccessKeyDialog}
      >
        <AccessKeyForm handleSubmit={handleCreateAccessKey} />
      </Modal>
    </Flex>
  );
};

export default memo(AccessKeys);
