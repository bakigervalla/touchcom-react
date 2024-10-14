import { Avatar, Flex } from '@mantine/core';
import React, { ReactNode, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { auth } from '@/data';
import { ArrowLeftIcon, LogoDark } from '@/icons';

import Menu from '@/components/Menu';

import { paths } from '@/common/constants';

import useStyles from './useStyles';

interface PropertyProps {
  children: ReactNode;
}

const Property = ({ children }: PropertyProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { user } = useRecoilValue(auth.state.authAtom);

  return (
    <Flex className={classes.propertyContainer}>
      <Flex className={classes.propertyHeader}>
        {user?.activeSite && (
          <Avatar
            className="icon"
            radius="xl"
            onClick={() => navigate(paths.DASHBOARD)}
          >
            <ArrowLeftIcon size={20} />
          </Avatar>
        )}
        <LogoDark className="logo" />
        <Menu.User />
      </Flex>
      <Flex className={classes.propertyContent}>{children}</Flex>
    </Flex>
  );
};

export default memo(Property);
