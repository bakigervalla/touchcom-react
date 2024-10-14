import { Badge, Chip, Flex, Text, clsx } from '@mantine/core';
import React, { memo, useState } from 'react';

import { EventFilterItem } from '@/common/interfaces';

import useStyles from './useStyles';

interface EventFilterProps {
  items: EventFilterItem[];
  onClick: (filter: EventFilterItem) => void;
  classNames?: string;
}

const EventFilter = ({ items, onClick, classNames }: EventFilterProps) => {
  const { classes } = useStyles();
  const [activeItemId, setActiveItemId] = useState(1);

  const handleClick = (item: EventFilterItem) => {
    setActiveItemId(item.id);
    onClick(item);
  };

  return (
    <Flex className={clsx(classes.filterContainer, classNames)}>
      {items.map((item) => (
        <Chip
          key={item.id}
          size="xl"
          radius={6}
          checked={false}
          onChange={() => handleClick(item)}
          className={item.id === activeItemId ? 'active' : ''}
        >
          <Flex>
            <Text>{item.label}</Text>
            {item.value != null && <Badge>{item.value}</Badge>}
          </Flex>
        </Chip>
      ))}
    </Flex>
  );
};

EventFilter.defaultProps = {
  classNames: '',
};

export default memo(EventFilter);
