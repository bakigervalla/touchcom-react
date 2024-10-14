import { Box, List } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { auth } from '@/data';

import { User } from '@/common/models';
import authUtils from '@/common/utils/auth';

import { NavigationItem, NavigationSubItem } from './components';
import navigationConfiguration from './navigationConfiguration';
import useStyles from './useStyles';

const NavigationList = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { pathname } = useLocation();
  const { user } = useRecoilValue(auth.state.authAtom);

  return (
    <List className={classes.navigationListContainer}>
      {navigationConfiguration(t)
        .common.filter((navItem) =>
          authUtils.hasOneRole(user as User, navItem.roles),
        )
        .map((navItem) => (
          <Box key={navItem.title}>
            <NavigationItem item={navItem} />
            {pathname.includes(navItem.route) &&
              navItem.subItems
                .filter((subItem) =>
                  authUtils.hasOneRole(user as User, subItem.roles),
                )
                .map((subItem) => (
                  <NavigationSubItem key={subItem.title} item={subItem} />
                ))}
          </Box>
        ))}
    </List>
  );
};

export default memo(NavigationList);
