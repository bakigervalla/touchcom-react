import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    root: {},
    radio: {
      cursor: 'pointer',
      backgroundColor: `${theme.white} !important`,
      '&:hover': {
        border: `1px solid ${theme.colors.neutral[7]}`,
      },
      '&:checked': {
        border: `1px solid ${theme.colors.primary[4]}`,
        '&:disabled': {
          '&:hover': {
            border: `1px solid ${theme.colors.primary[4]}`,
          },
        },
      },
      '&:disabled': {
        cursor: 'default',
        '&:hover': {
          border: `1px solid ${theme.colors.neutral[2]}`,
        },
      },
    },
    icon: {
      transform: 'scale(1.5) !important',
      '& path': { fill: theme.colors.primary[4] },
    },
  }),
};
