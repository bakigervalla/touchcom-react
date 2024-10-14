import { Avatar, Flex, Text, clsx } from '@mantine/core';
import { debounce as _debounce } from 'lodash';
import React, { memo } from 'react';

import { placeholders } from '@/common/constants';
import { SearchResult } from '@/common/models';

import useStyles from './useStyles';

interface SearchResultsProps {
  data: SearchResult[];
  handleClick: (item: SearchResult) => void;
}

const SearchResults = ({ data, handleClick }: SearchResultsProps) => {
  const { classes } = useStyles();

  return (
    <Flex className={classes.searchResultsContainer}>
      {data.map((item) => (
        <Flex
          key={item.id}
          gap={12}
          className={clsx(classes.searchItem, item.selected && 'selected')}
          onClick={() => handleClick(item)}
        >
          <Avatar
            src={item.imageUrl || placeholders.RANDOM_PLACEHOLDER_URL}
            radius="sm"
            size="md"
          />
          <Flex direction="column">
            <Text size={13}>{item.label}</Text>
            <Text variant="subtitle" size={13}>
              {item.subtitle}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default memo(SearchResults);
