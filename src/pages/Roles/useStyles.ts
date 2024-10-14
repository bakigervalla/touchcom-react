import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  rolesPageLayout: {
    flexDirection: 'row',
    padding: 'unset',
  },
  savedRolesContainer: {
    gap: 28,
    width: '40%',
    padding: '28px 0 32px 28px',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.colors.neutral[2]}`,
  },
  roleDetailsContainer: {
    gap: 28,
    width: '60%',
    padding: '28px 32px',
    flexDirection: 'column',
  },
}));
