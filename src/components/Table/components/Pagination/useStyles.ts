import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  paginationContainer: {
    gap: 32,
    alignItems: 'center',
  },

  highlightedText: {
    color: theme.colors.neutral[8],
    fontWeight: 700,

    '&.primary': {
      color: theme.colors.primary[5],
    },
  },
}));
