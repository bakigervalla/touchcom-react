import { Box, Flex, clsx } from '@mantine/core';
import React, { ReactNode, memo } from 'react';

import Navbar from '@/components/Navigation/Navbar';

import useStyles from './useStyles';

interface PageProps {
  children: ReactNode;
  navbarChildren?: ReactNode;
  childrenClassNames?: string;
}

const Page = ({ children, childrenClassNames, navbarChildren }: PageProps) => {
  const { classes } = useStyles();

  return (
    <Flex className={classes.pageContainer}>
      <Navbar.Root>{navbarChildren}</Navbar.Root>
      <Box className={clsx(classes.pageChildrenContainer, childrenClassNames)}>
        {children}
      </Box>
    </Flex>
  );
};

Page.defaultProps = {
  navbarChildren: undefined,
  childrenClassNames: '',
};

export default memo(Page);
