import { Avatar, Flex, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { memo } from 'react';

import useStyles from './useStyles';

interface AddNewCardProps {
  text: string;
  onClick: () => void;
}

const AddNewCard = ({ text, onClick }: AddNewCardProps) => {
  const { classes } = useStyles();

  return (
    <Flex className={classes.addNewCardContainer} onClick={onClick}>
      <Avatar className="icon" radius="xl">
        <IconPlus />
      </Avatar>
      <Text className="text">{text}</Text>
    </Flex>
  );
};

export default memo(AddNewCard);
