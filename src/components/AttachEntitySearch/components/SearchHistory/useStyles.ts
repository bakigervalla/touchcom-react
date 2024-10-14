import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  searchHistoryContainer: { flexDirection: 'column' },
  searchItem: {
    cursor: 'pointer',
    padding: '8px 12px',

    '&:hover': {
      background: theme.colors.neutral[1],
    },

    '&:active': {
      background: theme.colors.neutral[2],
    },
  },
  notFoundIcon: { height: '3rem !important', width: '3rem !important' },
  notFoundContainer: { gap: 5, flexDirection: 'row', padding: 10 },
  notFoundLabel: { fontSize: 13 },
  notFoundDescription: { fontSize: 10 },
}));
