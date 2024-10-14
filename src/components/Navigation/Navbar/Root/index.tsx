import { Box, Flex } from '@mantine/core';
import React, { ReactNode, memo } from 'react';

import { NotificationIcon } from '@/icons';

import GlobalSearch from '@/components/GlobalSearch';
import Menu from '@/components/Menu';

import useStyles from './useStyles';

interface NavbarRootProps {
  children?: ReactNode;
}

const Root = ({ children }: NavbarRootProps) => {
  const { classes } = useStyles();

  return (
    <Flex className={classes.navbarContainer}>
      <Box>{children}</Box>
      <GlobalSearch action={() => null} classNames={classes.search} />
      <NotificationIcon className={classes.icon} display="none" />
      <Menu.User />
    </Flex>
  );
};

Root.defaultProps = {
  children: undefined,
};

export default memo(Root);
