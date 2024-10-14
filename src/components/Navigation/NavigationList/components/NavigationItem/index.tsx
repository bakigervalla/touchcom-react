import { List, Text, clsx } from '@mantine/core';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavigationItem } from '@/common/interfaces';

import useStyles from './useStyles';

interface NavigationItemProps {
  item: NavigationItem;
}

const NavigationItem = ({ item }: NavigationItemProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <List.Item
      className={clsx(
        classes.navigationItem,
        window.location.pathname.includes(item.route) && 'active',
      )}
      onClick={() =>
        item.subItems.length > 0
          ? navigate(item.subItems[0].route)
          : navigate(item.route)
      }
      icon={<item.icon />}
    >
      <Text fw={500}>{item.title}</Text>
    </List.Item>
  );
};

export default memo(NavigationItem);
