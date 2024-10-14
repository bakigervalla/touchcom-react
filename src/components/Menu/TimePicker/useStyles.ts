import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  timePickerDropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: 6,
    padding: 12,
    width: '250px !important',
  },
  form: {
    gap: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    height: 36,
    padding: '8px 12px',
  },
}));
