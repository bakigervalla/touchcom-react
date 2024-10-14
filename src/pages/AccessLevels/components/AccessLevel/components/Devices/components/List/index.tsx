import { Button, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { uniqBy as _uniqBy } from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { NotFound, Table } from '@/components';
import { accessLevel } from '@/data';
import { NotFoundDeviceIcon } from '@/icons';

import columns from './columns';
import useStyles from './useStyles';

interface ListProps {
  isNewAccessLevelCreation: boolean;
  currentPage: number;
  openDialog: () => void;
  changePage: (page: number) => void;
}

const List = ({
  currentPage,
  isNewAccessLevelCreation,
  changePage,
  openDialog,
}: ListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { detachAccessLevelFromUserAndDevice } = accessLevel.actions();
  const { accessLevel: accessLevelData } = useRecoilValue(
    accessLevel.state.accessLevelAtom,
  );

  return !isNewAccessLevelCreation && accessLevelData?.devices?.data.length ? (
    <Table
      page={currentPage}
      pageCount={accessLevelData?.devices?.pageCount}
      pageSize={accessLevelData?.devices?.pageSize}
      handlePageChange={changePage}
      classNames={classes.table}
      enableBulkSelect={false}
      columns={columns(classes, t, navigate, (device) =>
        detachAccessLevelFromUserAndDevice(
          accessLevelData.id,
          undefined,
          device.id,
        ),
      )}
      data={accessLevelData?.devices?.data ?? []}
    />
  ) : (
    <Flex className={classes.notFoundContainer}>
      <NotFound
        label="notFound.devicesNotAttached.label"
        description="notFound.devicesNotAttached.description"
        Icon={NotFoundDeviceIcon}
      />
      <Button
        className={classes.button}
        leftIcon={<IconPlus size={18} />}
        disabled={isNewAccessLevelCreation}
        onClick={openDialog}
      >
        {t('buttons.attachDevice')}
      </Button>
    </Flex>
  );
};

export default memo(List);
