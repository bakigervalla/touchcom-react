import '@inovua/reactdatagrid-community/index.css';
import { TypePaginationProps } from '@inovua/reactdatagrid-community/types';
import { Flex, Pagination as PageNavigation, Text, clsx } from '@mantine/core';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { pagination } from '@/common/constants';

import useStyles from './useStyles';

const Pagination = ({
  count,
  limit,
  pageCount,
  page,
  gotoPage,
}: TypePaginationProps & { page: number; pageCount: number }) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.paginationContainer}>
      <Flex>
        <Text variant="subtitle">
          {t('tables.pagination.rowsPerPage')}{' '}
          <span className={clsx(classes.highlightedText, 'primary')}>
            {limit}
          </span>
        </Text>
      </Flex>
      <Flex>
        <Text variant="subtitle">
          <Trans i18nKey="tables.pagination.pageInfo" values={{ count, limit }}>
            Showing <span className={classes.highlightedText}>{count}</span> of{' '}
            <span className={classes.highlightedText}>{limit}</span> results
          </Trans>
        </Text>
      </Flex>
      <Flex ml="auto">
        <PageNavigation
          radius="xl"
          total={pageCount}
          boundaries={1}
          value={page}
          defaultValue={pagination.DEFAULT_PAGE}
          onChange={gotoPage}
        />
      </Flex>
    </Flex>
  );
};

export default memo(Pagination);
