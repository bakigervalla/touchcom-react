import { Button, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { NotFound, Table } from '@/components';
import { device } from '@/data';
import { NotFoundDeviceIcon } from '@/icons';

import columns from './columns';
import useStyles from './useStyles';

interface UsersProps {
  currentPage: number;
  openDialog: () => void;
  changePage: (page: number) => void;
}

const Users = ({ currentPage, changePage, openDialog }: UsersProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { changeUserVisibilityOnDevice, removeUserFromDevice } =
    device.actions();
  const { deviceUsers, deviceUsersPagination } = useRecoilValue(
    device.state.deviceAtom,
  );

  return deviceUsers?.length ? (
    <Table
      page={currentPage}
      pageCount={deviceUsersPagination.pageCount}
      pageSize={deviceUsersPagination.pageSize}
      handlePageChange={changePage}
      enableBulkSelect={false}
      columns={columns(
        navigate,
        classes,
        t,
        (user, isVisible) =>
          changeUserVisibilityOnDevice(
            parseInt(id ?? '0', 10),
            user.id,
            isVisible,
          ),
        (user) =>
          removeUserFromDevice({ id: parseInt(id ?? '0', 10) }, user.id),
      )}
      data={deviceUsers ?? []}
    />
  ) : (
    <Flex className={classes.notFoundContainer}>
      <NotFound
        label="notFound.connectedUsers.label"
        description="notFound.connectedUsers.description"
        Icon={NotFoundDeviceIcon}
      />
      <Button
        onClick={openDialog}
        className={classes.button}
        rightIcon={<IconPlus size={18} />}
      >
        {t('buttons.attachUser')}
      </Button>
    </Flex>
  );
};

export default memo(Users);
