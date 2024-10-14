import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  entityInfoContainer: {
    gap: 6,
    cursor: 'pointer',
    alignItems: 'center',

    '& .iconContainer': {
      background: theme.colors.neutral[5],
    },
  },
}));
