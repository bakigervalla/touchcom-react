import '@inovua/reactdatagrid-community/index.css';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import {
  TypeColumn,
  TypeDataSource,
} from '@inovua/reactdatagrid-community/types';
import { clsx } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { pagination } from '@/common/constants';

import { Pagination } from './components';
import useStyles from './useStyles';

interface TableProps {
  columns: TypeColumn[];
  data: TypeDataSource;
  page: number;
  pageCount: number;
  handlePageChange: (
    page: number,
    config?:
      | {
          force: boolean;
        }
      | undefined,
  ) => void;
  pageSize?: number;
  classNames?: string;
  showHeader?: boolean;
  enableBulkSelect?: boolean;
}

const Table = ({
  classNames,
  columns,
  data,
  enableBulkSelect,
  page,
  pageCount,
  pageSize,
  showHeader,
  handlePageChange,
}: TableProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <ReactDataGrid
      idProperty="id"
      rowHeight={60}
      showHeader={showHeader}
      checkboxColumn={enableBulkSelect}
      showZebraRows={false}
      loadingText={t('common.tables')}
      emptyText={t('common.noRecords')}
      renderPaginationToolbar={(props) => (
        <Pagination
          {...props}
          page={page}
          pageCount={pageCount}
          gotoPage={handlePageChange}
        />
      )}
      className={clsx(classes.table, classNames)}
      pagination
      defaultLimit={pageSize}
      defaultSkip={pageSize}
      pageSizes={pagination.PAGE_SIZES}
      defaultGroupBy={[]}
      enableColumnAutosize
      columns={columns}
      dataSource={data}
    />
  );
};

Table.defaultProps = {
  classNames: '',
  pageSize: pagination.DEFAULT_PAGE_SIZE,
  showHeader: true,
  enableBulkSelect: true,
};

export default memo(Table);
