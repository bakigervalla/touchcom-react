import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    stepIcon: {
      height: 26,
      width: 26,
      minWidth: 26,
      fontSize: 13,
      borderRadius: 100,
      backgroundColor: theme.white,
      color: theme.colors.neutral[4],
      border: `1px solid ${theme.colors.neutral[4]}`,

      '&[data-progress]': {
        color: theme.colors.secondary[6],
        border: `1px solid ${theme.colors.secondary[6]}`,
      },

      '&[data-completed]': {
        backgroundColor: theme.colors.secondary[6],
        border: `1px solid ${theme.colors.secondary[6]}`,
      },
    },
    stepLabel: {
      fontSize: 13,
    },
    stepCompletedIcon: {
      height: 13,
      width: 13,
      top: '25%',
      left: '25%',
    },
    separatorActive: {
      height: 1,
      backgroundColor: theme.colors.secondary[6],
    },
  }),
};
