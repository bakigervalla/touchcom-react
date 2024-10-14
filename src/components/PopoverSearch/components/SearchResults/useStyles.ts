import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  searchResultsContainer: { flexDirection: 'column' },
  searchItem: {
    cursor: 'pointer',
    padding: '8px 12px',

    '&.selected': {
      background: theme.colors.neutral[2],
    },

    '&:hover': {
      background: theme.colors.neutral[1],
    },

    '&:active': {
      background: theme.colors.neutral[2],
    },
  },
}));
