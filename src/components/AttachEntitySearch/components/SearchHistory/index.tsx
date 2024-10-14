import { Avatar, Flex, Text } from '@mantine/core';
import { debounce as _debounce } from 'lodash';
import React, { memo } from 'react';

import NotFound from '@/components/NotFound';

import { HistoryItem, NotFoundData } from '@/common/interfaces';

import useStyles from './useStyles';

interface SearchHistoryProps {
  data: HistoryItem[];
  notFound: NotFoundData;
  handleItemSelect: (item: HistoryItem) => void;
}

const SearchHistory = ({
  data,
  notFound,
  handleItemSelect,
}: SearchHistoryProps) => {
  const { classes } = useStyles();

  return (
    <Flex className={classes.searchHistoryContainer}>
      {data.length ? (
        <Flex direction="column">
          {data.map((item) => (
            <Flex
              key={item.title}
              gap={12}
              className={classes.searchItem}
              onClick={() => handleItemSelect(item)}
            >
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
      ) : (
        <NotFound
          className={{
            icon: classes.notFoundIcon,
            container: classes.notFoundContainer,
            label: classes.notFoundLabel,
            description: classes.notFoundDescription,
          }}
          label={notFound.label}
          description={notFound.description}
          Icon={notFound.icon}
        />
      )}
    </Flex>
  );
};

export default memo(SearchHistory);
