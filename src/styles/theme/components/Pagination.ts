import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    control: {
      border: 0,

      '&[data-active]': {
        color: theme.colors.neutral[8],
        fontWeight: 700,
        backgroundColor: theme.colors.neutral[1],

        '&:hover': {
          backgroundColor: `${theme.colors.neutral[1]} !important`,
        },
      },

      '&[data-disabled]': {
        border: `1px solid ${theme.colors.neutral[2]}`,
      },

      '&:hover': {
        backgroundColor: `${theme.colors.neutral[0]} !important`,
      },

      '&:first-of-type': {
        background: 'unset !important',
        border: `1px solid ${theme.colors.neutral[3]}`,

        '&[data-disabled]': {
          border: `1px solid ${theme.colors.neutral[2]}`,

          '&:hover': {
            border: `1px solid ${theme.colors.neutral[2]}`,
          },
        },

        '&:hover': {
          border: `1px solid ${theme.colors.neutral[8]}`,
        },
      },

      '&:last-of-type': {
        background: 'unset !important',
        border: `1px solid ${theme.colors.neutral[3]}`,

        '&[data-disabled]': {
          border: `1px solid ${theme.colors.neutral[2]}`,

          '&:hover': {
            border: `1px solid ${theme.colors.neutral[2]}`,
          },
        },

        '&:hover': {
          border: `1px solid ${theme.colors.neutral[8]}`,
        },
      },
    },
  }),
};
