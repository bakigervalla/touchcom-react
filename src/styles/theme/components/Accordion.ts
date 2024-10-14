import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    item: {
      backgroundColor: theme.white,
      borderRadius: 0,
      border: `1px solid ${theme.colors.neutral[2]}`,
    },
    panel: {
      padding: '12px 18px',
      borderRadius: 4,
    },
    content: {
      backgroundColor: theme.colors.neutral[0],
      padding: '12px 18px',
    },
  }),
};
