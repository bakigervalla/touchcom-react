import { List, Text, clsx } from '@mantine/core';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavigationItem } from '@/common/interfaces';

import useStyles from './useStyles';

interface NavigationSubItemProps {
  item: Omit<NavigationItem, 'subItems'>;
}

const NavigationSubItem = ({ item }: NavigationSubItemProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <List.Item
      className={clsx(
        classes.navigationSubItem,
        window.location.pathname.includes(item.route) && 'active',
      )}
      onClick={() => navigate(item.route)}
      icon={
        <item.icon
          className={clsx(
            classes.icon,
            window.location.pathname.includes(item.route) && 'active',
          )}
          size={20}
        />
      }
    >
      <Text
        className={clsx(
          classes.navigationSubItemText,
          window.location.pathname.includes(item.route) && 'active',
        )}
      >
        {item.title}
      </Text>
    </List.Item>
  );
};

export default memo(NavigationSubItem);
