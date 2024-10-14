import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  rolesInfoContainer: {
    gap: 20,
    flexDirection: 'column',
  },
  linkContainer: {
    gap: 4,
    display: 'flex',
    alignItems: 'end',
  },
  link: {
    gap: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    color: theme.colors.primary[5],
    fontWeight: 600,
  },
}));
