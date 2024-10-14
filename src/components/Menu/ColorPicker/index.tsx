import { Box, Popover } from '@mantine/core';
import React, { memo, useCallback, useState } from 'react';

import useStyles from './useStyles';

const COLORS = [
  '#DB394F',
  '#FF9755',
  '#F7DE02',
  '#9FE960',
  '#3083FF',
  '#04DBF7',
  '#757575',
];

interface ColorPickerProps {
  activeColor: string;
  setActiveColor: (value: string) => void;
}

const ColorPicker = ({ activeColor, setActiveColor }: ColorPickerProps) => {
  const { classes } = useStyles();
  const [isColorPickerOpened, setIsColorPickerOpened] = useState(false);

  const handleColorSelect = useCallback(
    (color: string) => {
      setActiveColor(color);
      setIsColorPickerOpened(false);
    },
    [setIsColorPickerOpened, setActiveColor],
  );

  return (
    <Popover
      opened={isColorPickerOpened}
      shadow="xs"
      position="bottom"
      onChange={(opened) => setIsColorPickerOpened(opened)}
    >
      <Popover.Target>
        <Box
          className={classes.colorBox}
          style={{ background: activeColor }}
          onClick={() => setIsColorPickerOpened((prev) => !prev)}
        />
      </Popover.Target>
      <Popover.Dropdown className={classes.colorPickerDropdownContainer}>
        {COLORS.map((color) => (
          <Box
            key={color}
            className={classes.colorBox}
            onClick={() => handleColorSelect(color)}
            style={{
              background: color,
              ...(color === activeColor ? { border: '3px solid #ffa9a9' } : {}),
            }}
          />
        ))}
      </Popover.Dropdown>
    </Popover>
  );
};

export default memo(ColorPicker);
