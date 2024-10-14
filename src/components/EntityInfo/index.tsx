import { Avatar, Flex, Text } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import React, { memo } from 'react';

import { EntityInfoData } from '@/common/interfaces';

import useStyles from './useStyles';

interface EntityInfoProps {
  data: EntityInfoData | null;
  onClick: (data: EntityInfoData | null) => void;
  imageRadius?: 'sm' | 'xl';
  imageSize?: 'sm' | 'md' | 'lg' | 'xl';
}

const EntityInfo = ({
  data,
  imageSize,
  imageRadius,
  onClick,
}: EntityInfoProps) => {
  const { classes } = useStyles();

  return data ? (
    <Flex className={classes.entityInfoContainer} onClick={() => onClick(data)}>
      <Avatar
        size={imageSize}
        radius={imageRadius}
        src={data.imageUrl}
        alt="Entity info image"
      />
      <Flex direction="column">
        <Text>{data.title}</Text>
        <Text variant="subtitle">{data.subtitle}</Text>
      </Flex>
    </Flex>
  ) : (
    <Flex className={classes.entityInfoContainer} onClick={() => onClick(data)}>
      <Avatar
        size={imageSize}
        radius={imageRadius}
        className="iconContainer"
        alt="Entity info image not found"
      >
        <IconQuestionMark size={18} />
      </Avatar>
      <Text>N/A</Text>
    </Flex>
  );
};

EntityInfo.defaultProps = {
  imageSize: 'sm',
  imageRadius: 'xl',
};

export default memo(EntityInfo);
