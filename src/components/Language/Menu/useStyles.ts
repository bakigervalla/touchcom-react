import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  titleContainer: {
    height: 40,
    padding: '12px 16px',
  },

  itemContainer: {
    gap: 12,
    height: 40,
    padding: '0 16px',
    alignItems: 'center',
    cursor: 'pointer',

    '& .languageIcon': {
      height: 20,
      width: 20,
      borderRadius: 50,
    },

    '& .icon': {
      marginLeft: 'auto',
    },

    '&.active, &:hover': {
      background: theme.colors.neutral[1],
    },
  },
}));
