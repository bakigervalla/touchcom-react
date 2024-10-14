import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  navbarContainer: {
    height: 74,
    placeItems: 'center',
    borderBottom: `1px solid ${theme.colors.neutral[2]}`,
    background: theme.white,
    padding: '0 32px',
  },

  search: { margin: '0 60px 0 auto' },

  icon: { marginRight: 28 },
}));
