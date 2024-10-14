import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    root: {},
    tab: {
      gap: 10,
      padding: '0.5rem, 0, 0.625, 0',
      '&:hover': {
        background: 'inherit',
        color: theme.colors.neutral[7],
      },
      '&[data-active]': {
        color: theme.colors.neutral[8],
        borderBottom: `2px solid ${theme.colors.primary[4]}`,
        '&:hover': {
          borderBottom: `2px solid ${theme.colors.primary[4]}`,
        },
      },
    },
    tabRightSection: {
      '& .mantine-Badge-root': {
        backgroundColor: theme.colors.neutral[2],
        '& .mantine-Badge-inner': {
          color: theme.colors.neutral[8],
          fontWeight: 600,
        },
      },
    },
  }),
};
