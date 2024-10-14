import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  navbarTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  titleContainer: {
    display: 'flex',
    gap: '0.3em',

    '& .icon': {
      transform: 'rotate(-90deg)',
      cursor: 'default',
      stroke: theme.colors.neutral[3],
    },
  },

  navbarTitle: {
    fontWeight: 400,
    fontSize: 14,
  },

  titleDecoration: {
    fontWeight: 700,
    fontSize: 20,
    maxWidth: '35%',
    color: '#f2682b',
  },
}));
