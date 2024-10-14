import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  colorPickerDropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: 6,
    padding: 8,
  },
  colorBox: {
    cursor: 'pointer',
    borderRadius: 2,
    height: 20,
    width: 20,
  },
}));
