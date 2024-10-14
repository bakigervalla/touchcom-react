import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  exceptionForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: 450,
    '& .mantine-RadioGroup-label': { fontWeight: 600 },
    '& .mantine-TextInput-root': { width: '100%' },
  },
  buttonsContainer: {
    gap: 10,
    padding: '10px 0',
    alignItems: 'center',
  },
  submitButton: { height: 40 },
  label: {
    fontSize: 13,
    fontWeight: 600,
  },
}));
