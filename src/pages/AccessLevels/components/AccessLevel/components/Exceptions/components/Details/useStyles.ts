import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  detailsContainer: {
    flexDirection: 'column',
    gap: 20,
    width: 450,

    '& .label': {
      fontSize: 13,
      fontWeight: 600,
    },

    '& .text': { fontWeight: 400 },

    '& .mantine-RadioGroup-label': { fontWeight: 600 },

    '& .mantine-TextInput-root': { width: '100%' },
  },
  buttonsContainer: {
    gap: 10,
    padding: '10px 0',
    alignItems: 'center',
  },
}));
