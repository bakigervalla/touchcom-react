import { Button, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { EventFilter, Input, NotFound, Table } from '@/components';
import { accessKey } from '@/data';
import { ImportIcon, NotFoundAccessKeyIcon } from '@/icons';

import { pagination as paginationConstants } from '@/common/constants';
import { AccessKeyFilter, EventFilterItem } from '@/common/interfaces';
import { AccessKey, AccessKeyStatus } from '@/common/models';

import { Details } from '../../Shared';

import columns from './columns';
import useStyles from './useStyles';

const SavedKeys = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(
    paginationConstants.DEFAULT_PAGE,
  );
  const [activeFilter, setActiveFilter] = useState<AccessKeyFilter | undefined>(
    undefined,
  );
  const {
    getAccessKeys,
    updateAccessKey,
    getAccessKey,
    getAccessKeysOverview,
  } = accessKey.actions();
  const { accessKeys, accessKeysOverview, pagination, areAccessKeysLoading } =
    useRecoilValue(accessKey.state.accessKeyAtom);

  const ACCESS_KEY_TYPE_FILTERS = useMemo(
    () => [
      {
        id: 1,
        key: 'ALL',
        label: t('page.accessKeys.filters.allKeys'),
        value: accessKeysOverview?.totalKeys ?? 0,
      },
      {
        id: 2,
        key: AccessKeyStatus.ACTIVE,
        label: t('page.accessKeys.filters.active'),
        value: accessKeysOverview?.activeKeys ?? 0,
      },
      {
        id: 3,
        key: AccessKeyStatus.INACTIVE,
        label: t('page.accessKeys.filters.inactive'),
        value: accessKeysOverview?.inactiveKeys ?? 0,
      },
    ],
    [t, accessKeysOverview],
  );

  const handleInfoClick = useCallback(
    (data: AccessKey) => {
      open();
      getAccessKey(data.id);
    },
    [open, getAccessKey],
  );

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(paginationConstants.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  const handleFilter = useCallback((filter: EventFilterItem) => {
    setCurrentPage(paginationConstants.DEFAULT_PAGE);
    setActiveFilter(
      filter.key !== 'ALL'
        ? { status: filter.key as AccessKeyStatus }
        : undefined,
    );
  }, []);

  useEffect(() => {
    getAccessKeys(
      {
        page: currentPage,
        pageSize: paginationConstants.ACCESS_KEYS.PAGE_SIZE,
      },
      { ...activeFilter, search },
    );
  }, [activeFilter, search, currentPage, getAccessKeys]);

  useEffect(() => {
    getAccessKeysOverview();
  }, [getAccessKeysOverview]);

  return (
    <Flex className={classes.savedKeysContainer}>
      <EventFilter items={ACCESS_KEY_TYPE_FILTERS} onClick={handleFilter} />
      <Flex className={classes.contentContainer}>
        <Flex>
          <Flex className={classes.actionsContainer}>
            <Input.Search action={handleSearch} />
            <Button
              ml="auto"
              variant="neutral"
              leftIcon={<ImportIcon size={18} />}
              className={classes.button}
            >
              {t('common.import')}
            </Button>
          </Flex>
        </Flex>
        {!areAccessKeysLoading && accessKeys.length > 0 ? (
          <Table
            data={accessKeys}
            page={currentPage}
            enableBulkSelect={false}
            classNames={classes.table}
            pageSize={pagination.pageSize}
            pageCount={pagination.pageCount}
            handlePageChange={setCurrentPage}
            columns={columns(
              handleInfoClick,
              updateAccessKey,
              { ...activeFilter, search },
              classes,
              t,
            )}
          />
        ) : (
          <NotFound
            label="notFound.keys.label"
            description="notFound.keys.description"
            Icon={NotFoundAccessKeyIcon}
            className={{ container: classes.notFoundContainer }}
          />
        )}
      </Flex>
      <Modal
        title={t('page.accessKeys.accessKeyDetailsTitle')}
        size="auto"
        centered
        opened={isDialogOpened}
        onClose={close}
      >
        <Details onClose={close} filters={{ ...activeFilter, search }} />
      </Modal>
    </Flex>
  );
};

export default memo(SavedKeys);
