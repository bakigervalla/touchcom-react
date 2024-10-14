import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  text: {
    fontWeight: 700,
    fontSize: 14,

    '&:hover': {
      cursor: 'text',
      paddingRight: 40,
      backgroundColor: theme.colors.neutral[1],
    },

    [theme.breakpoints.md]: {
      fontSize: 12,
    },
  },
  root: {
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
  buttonContainer: {
    gap: '0.2em',
  },
  contentBox: {
    cursor: 'pointer',
    height: 17,
    width: 17,
    borderRadius: 4,

    '& .icon': {
      '&.warning': {
        color: theme.colors.danger[3],
      },
    },

    '&.confirm': {
      backgroundColor: theme.colors.neutral[1],
    },

    '&.cancel': {
      backgroundColor: theme.colors.primary[1],
    },

    [theme.breakpoints.md]: {
      height: 16,
      width: 16,
      borderRadius: 3,
    },
  },
}));
