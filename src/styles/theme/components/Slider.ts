import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    root: {
      width: 120,
    },
    bar: {
      height: 2,
      backgroundColor: theme.colors.neutral[2],
    },
    track: {
      height: 2,
      '&:before': {
        backgroundColor: theme.colors.neutral[2],
      },
    },
    thumb: {
      backgroundColor: theme.colors[theme.primaryColor][4],
      borderWidth: 0,
    },
    label: {
      backgroundColor: theme.white,
      border: `0.0625rem solid ${theme.colors.neutral[2]}`,
      color: theme.colors.neutral[8],
    },
  }),
};
