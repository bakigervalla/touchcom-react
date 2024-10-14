import { Button, Flex, clsx } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Input, NotFound, Table } from '@/components';
import {
  ArrowDownIcon,
  FilterIcon,
  NotFoundDeviceIcon,
  PrintIcon,
} from '@/icons';

import columns from './columns';
import useStyles from './useStyles';

const SHOW_TABLE = false;

const Events = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return SHOW_TABLE ? (
    <Flex className={classes.eventsContainer}>
      <Flex>
        <Flex className={classes.actionsContainer}>
          <Input.Search action={() => null} />
          <Button
            variant="filter"
            className={clsx(classes.button, 'filter')}
            leftIcon={<FilterIcon size={18} />}
            rightIcon={<ArrowDownIcon size={16} />}
          >
            {t('common.filter')}
          </Button>
          <Button
            ml="auto"
            variant="neutral"
            leftIcon={<PrintIcon size={18} />}
            className={classes.button}
          >
            {t('Print')}
          </Button>
        </Flex>
      </Flex>
      <Table
        page={1}
        pageCount={1}
        pageSize={10}
        handlePageChange={() => null}
        classNames={classes.table}
        enableBulkSelect={false}
        columns={columns}
        data={[
          {
            date: '11/20/2022, 11:24',
            description: 'Access Granted',
            deviceType: { name: 'Visitor Panel', type: 'PANEL' },
          },
          {
            date: '11/20/2022, 11:24',
            description: 'Access Granted',
            deviceType: { name: 'Door', type: 'DOOR' },
          },
        ]}
      />
    </Flex>
  ) : (
    <NotFound
      label="notFound.events.label"
      description="notFound.events.description"
      Icon={NotFoundDeviceIcon}
      className={{ container: classes.notFoundContainer }}
    />
  );
};

export default memo(Events);
