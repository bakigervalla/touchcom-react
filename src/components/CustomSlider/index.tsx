import { Flex, Slider, Text, clsx } from '@mantine/core';
import React, { memo } from 'react';

import useStyles from './useStyles';

interface CustomSliderProps {
  handleChange: (value: number) => void;
  value?: number;
  classNames?: string;
}

const CustomSlider = ({
  value,
  handleChange,
  classNames,
}: CustomSliderProps) => {
  const { classes } = useStyles();

  return (
    <Flex className={clsx(classes.container, classNames)}>
      <Slider value={value} onChange={handleChange} />
      <Flex className={classes.inputBox}>
        <Text>{value}</Text>
      </Flex>
    </Flex>
  );
};

CustomSlider.defaultProps = {
  value: 0,
  classNames: undefined,
};

export default memo(CustomSlider);
