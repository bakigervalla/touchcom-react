import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  itemContainer: {
    gap: 12,
    height: 55,
    padding: '8px 16px',
    alignItems: 'center',
    cursor: 'pointer',

    '& .image': {
      height: 40,
      width: 40,
      background: theme.colors.primary[0],
    },

    '& .text': {
      fontWeight: 600,
    },

    '&.active, &:hover': {
      background: theme.colors.neutral[1],
    },
  },
}));
