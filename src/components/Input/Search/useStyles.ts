import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    width: 255,
    border: 'unset',
    borderBottom: `1px solid ${theme.colors.neutral[2]}`,

    '& .mantine-Input-input': {
      fontSize: 13,
      border: 'unset',

      '&:hover': {
        border: 'unset',
      },

      '&:focus-within': {
        border: 'unset',
      },
    },

    '&:hover': {
      border: 'unset',
      borderBottom: `1px solid ${theme.colors.neutral[8]}`,
    },

    '&:focus-within': {
      border: 'unset',
      borderBottom: `1px solid ${theme.colors.neutral[8]}`,
    },
  },
  icon: {
    color: theme.colors.neutral[6],

    '&.close': { cursor: 'pointer' },

    '&:hover': {
      color: theme.colors.neutral[8],
    },
  },
}));
