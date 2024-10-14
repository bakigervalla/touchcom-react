import { Button, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { Dispatch, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { NotFound, Table } from '@/components';
import { user } from '@/data';
import { NotFoundUserIcon } from '@/icons';

import columns from './columns';
import useStyles from './useStyles';

interface ResidentsProps {
  currentPage: number;
  newUserClick: () => void;
  handlePageChange: Dispatch<React.SetStateAction<number>>;
}

const Residents = ({
  currentPage,
  handlePageChange,
  newUserClick,
}: ResidentsProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { residents, pagination } = useRecoilValue(user.state.residentAtom);

  return residents.length > 0 ? (
    <Table
      columns={columns(navigate, classes, t)}
      data={residents}
      page={currentPage}
      enableBulkSelect={false}
      pageCount={pagination.pageCount}
      pageSize={pagination.pageSize}
      handlePageChange={handlePageChange}
    />
  ) : (
    <Flex className={classes.notFoundWrapper}>
      <NotFound
        Icon={NotFoundUserIcon}
        label="notFound.users.label"
        description="notFound.users.description"
        className={{ container: classes.notFoundContainer }}
      />
      <Button
        className={classes.button}
        w="max-content"
        rightIcon={<IconPlus size={18} />}
        onClick={newUserClick}
      >
        {t('buttons.newUser')}
      </Button>
    </Flex>
  );
};

export default memo(Residents);
