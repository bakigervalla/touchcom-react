import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  navigationSubItem: {
    borderRadius: 2,
    cursor: 'pointer',
    padding: '12px 40px',
    alignItems: 'center !important',

    '&.active': {
      background: theme.colors.neutral[1],
    },

    '&:hover': {
      background: theme.colors.neutral[1],
    },
  },

  navigationSubItemText: {
    fontWeight: 400,
    fontSize: 13,
    color: theme.colors.neutral[6],

    '&.active': {
      color: theme.colors.neutral[8],
    },
  },

  icon: {
    color: theme.colors.neutral[6],

    '&.active': {
      color: theme.colors.neutral[8],
    },
  },
}));
