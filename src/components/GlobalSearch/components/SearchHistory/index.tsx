import { Avatar, Button, Divider, Flex, Text } from '@mantine/core';
import { IconChevronRight, IconRefresh, IconX } from '@tabler/icons-react';
import { debounce as _debounce } from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from './useStyles';

const RECENT_SEARCHES = ['Pal', 'Oslo House', '4412', 'Aker Brygge'];
const SEARCH_RESULTS = [
  {
    group: 'Access Keys',
    details: [
      { title: 'Title is going to be here 1', subtitle: 'Site name' },
      { title: 'Title is going to be here 2', subtitle: 'Site name' },
      { title: 'Title is going to be here 3', subtitle: 'Site name' },
      { title: 'Title is going to be here 4', subtitle: 'Site name' },
    ],
  },
  {
    group: 'Users',
    details: [
      { title: 'Title is going to be here 1', subtitle: 'Site name' },
      { title: 'Title is going to be here 2', subtitle: 'Site name' },
      { title: 'Title is going to be here 3', subtitle: 'Site name' },
      { title: 'Title is going to be here 4', subtitle: 'Site name' },
    ],
  },
];

const SearchHistory = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.searchHistoryContainer}>
      <Flex className={classes.recentSearchesContainer}>
        <Flex justify="space-between">
          <Text variant="subtitle">{t('Recent searches')}</Text>
          <Button
            variant="subtle"
            rightIcon={<IconX size={12} />}
            onClick={() => null}
          >
            {t('Clear all')}
          </Button>
        </Flex>
        <Flex gap={8}>
          {RECENT_SEARCHES?.map((item) => (
            <Button
              key={item}
              variant="neutral"
              leftIcon={<IconRefresh size={12} />}
            >
              {item}
            </Button>
          ))}
        </Flex>
      </Flex>
      {SEARCH_RESULTS?.map((group) => (
        <Flex key={group.group} direction="column">
          <Divider m="sm" />
          <Flex align="center" justify="space-between" p="0 12px">
            <Text variant="subtitle">{group.group}</Text>
            <Button
              variant="subtle"
              rightIcon={<IconChevronRight size={12} />}
              onClick={() => null}
            >
              {t('See all')}
            </Button>
          </Flex>
          <Flex direction="column">
            {group.details?.map((item) => (
              <Flex key={item.title} gap={12} className={classes.searchItem}>
                <Avatar radius="xl" size="md" />
                <Flex direction="column">
                  <Text size={13}>{item.title}</Text>
                  <Text variant="subtitle" size={13}>
                    {item.subtitle}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default memo(SearchHistory);
