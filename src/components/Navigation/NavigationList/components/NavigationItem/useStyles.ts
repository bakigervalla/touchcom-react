import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  navigationItem: {
    borderRadius: 2,
    cursor: 'pointer',
    padding: '20px 24px',
    alignItems: 'center !important',

    '&.active': {
      background: theme.colors.neutral[1],
      borderLeft: `2px solid ${theme.colors.primary[5]}`,
    },

    '&:hover': {
      background: theme.colors.neutral[1],
    },
  },
}));
