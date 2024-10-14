import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  searchHistoryContainer: { flexDirection: 'column' },
  recentSearchesContainer: {
    padding: 12,
    width: '100%',
    flexDirection: 'column',

    '& .mantine-Button-root': {
      height: 28,
      padding: '0 10px',
      alignItems: 'center',
    },
  },
  recentSearchButton: {
    gap: 8,
    height: 28,
    padding: '0px 10px',
    alignItems: 'center',
  },
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
}));
