import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  statisticsContainer: {
    gap: 18,
    flexDirection: 'column',
  },
  notFoundContainer: {
    padding: 150,
    maxWidth: '100%',
    alignItems: 'center',
  },
  button: {
    height: 36,
    padding: '8px 26px',

    '&.filter': {
      padding: '8px 0',
    },
  },
}));
