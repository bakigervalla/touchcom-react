import { Box, Flex, Text, clsx } from '@mantine/core';
import React from 'react';

import { DynamicDataContainerColumn, KeyPair } from '@/common/interfaces';

import useStyles from './useStyles';

interface DynamicDataContainerProps<T> {
  data: (T & { id: number; color?: string })[];
  columns: DynamicDataContainerColumn<T>[];
  showInfoColor?: boolean;
  classNames?: { container: string };
  onClick?: (item: T) => void;
  isSelected?: (item: T) => boolean;
}

const DynamicDataContainer = <T,>({
  data,
  columns,
  showInfoColor,
  classNames,
  onClick,
  isSelected,
}: DynamicDataContainerProps<T>) => {
  const { classes } = useStyles();

  return (
    <>
      {data.map((item) => (
        <Flex
          key={item.id}
          onClick={onClick ? () => onClick(item) : () => null}
          className={clsx(
            classes.dynamicDataContainer,
            isSelected && isSelected(item) && 'active',
            classNames?.container,
          )}
          style={
            isSelected && isSelected(item) && showInfoColor
              ? {
                  border: `1px solid ${item?.color ?? '#9E9E9E'}`,
                  borderLeftWidth: 4,
                  background: `${item?.color ?? '#9E9E9E'}11`,
                }
              : {
                  ...(showInfoColor
                    ? { borderLeft: `4px solid ${item?.color ?? '#9E9E9E'}` }
                    : {}),
                }
          }
        >
          {columns.map((column) =>
            'render' in column && column.render ? (
              <Box key={`${item.id}-${column.key}`}>{column.render(item)}</Box>
            ) : (
              <Text key={`${item.id}-${column.key}`}>
                {(item as KeyPair<any>)[column.key]}
              </Text>
            ),
          )}
        </Flex>
      ))}
    </>
  );
};

DynamicDataContainer.defaultProps = {
  showInfoColor: false,
  onClick: () => null,
  isSelected: () => false,
  classNames: { container: '' },
};

export default DynamicDataContainer;
