import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  deviceForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    '& .mantine-RadioGroup-label': { fontWeight: 600 },
    '& .mantine-TextInput-root': { width: '100%' },
  },
}));
