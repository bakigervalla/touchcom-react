import { Box } from '@mantine/core';
import React, { ReactNode, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { LogoDark } from '@/icons';

import Menu from '@/components/Menu';

import { paths } from '@/common/constants';

import NavigationList from '../NavigationList';

import useStyles from './useStyles';

interface RootProps {
  children: ReactNode;
}

const Root = ({ children }: RootProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.navigation}>
      <Box className={classes.drawer}>
        <NavLink to={paths.DASHBOARD}>
          <LogoDark className={classes.logo} />
        </NavLink>
        <Menu.Site />
        <NavigationList />
      </Box>
      {children}
    </Box>
  );
};

export default memo(Root);
