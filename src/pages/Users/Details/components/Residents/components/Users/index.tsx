import { Button, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { NotFound, Table } from '@/components';
import { user } from '@/data';
import { NotFoundDeviceIcon } from '@/icons';

import { UserType } from '@/common/models';

import columns from './columns';
import useStyles from './useStyles';

interface UsersProps {
  currentPage: number;
  openDialog: () => void;
  changePage: (page: number) => void;
}

const Users = ({ currentPage, changePage, openDialog }: UsersProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { updateUser } = user.actions();
  const { resident } = useRecoilValue(user.state.residentAtom);
  const { userResidents, userResidentsPagination } = useRecoilValue(
    user.state.userAtom,
  );

  return userResidents?.length ? (
    <Table
      page={currentPage}
      pageCount={userResidentsPagination.pageCount}
      pageSize={userResidentsPagination.pageSize}
      handlePageChange={changePage}
      enableBulkSelect={false}
      columns={columns(navigate, classes, t, (user) =>
        updateUser({
          id: user?.id,
          ...(resident?.type === UserType.APARTMENT
            ? { apartmentId: null }
            : { companyId: null }),
        }),
      )}
      data={userResidents ?? []}
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
