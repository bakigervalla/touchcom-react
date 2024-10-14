import { Button, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { uniqBy as _uniqBy } from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { NotFound, Table } from '@/components';
import { device, user } from '@/data';
import { NotFoundDeviceIcon } from '@/icons';

import columns from './columns';
import useStyles from './useStyles';

interface DevicesProps {
  currentPage: number;
  openDialog: () => void;
  changePage: (page: number) => void;
}

const Devices = ({ currentPage, changePage, openDialog }: DevicesProps) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { changeUserVisibilityOnDevice, removeUserFromDevice } =
    device.actions();
  const { userDevices, userDevicesPagination } = useRecoilValue(
    user.state.userAtom,
  );

  return userDevices?.length ? (
    <Table
      page={currentPage}
      pageCount={userDevicesPagination.pageCount}
      pageSize={userDevicesPagination.pageSize}
      handlePageChange={changePage}
      enableBulkSelect={false}
      columns={columns(
        navigate,
        classes,
        t,
        (device, isVisible) =>
          changeUserVisibilityOnDevice(
            device.id,
            parseInt(id ?? '0', 10),
            isVisible,
          ),
        (device) => removeUserFromDevice(device, parseInt(id ?? '0', 10)),
      )}
      data={userDevices ?? []}
    />
  ) : (
    <Flex className={classes.notFoundContainer}>
      <NotFound
        label="notFound.devices.label"
        description="notFound.devices.description"
        Icon={NotFoundDeviceIcon}
      />
      <Button
        onClick={openDialog}
        className={classes.button}
        rightIcon={<IconPlus size={18} />}
      >
        {t('buttons.attachDevice')}
      </Button>
    </Flex>
  );
};

export default memo(Devices);
