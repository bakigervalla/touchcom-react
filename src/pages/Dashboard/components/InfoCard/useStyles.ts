import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  infoCardContainer: {
    gap: 18,
    width: '33%',
    padding: '20px 20px',
    flexDirection: 'column',
    border: `1px solid ${theme.colors.neutral[2]}`,
  },
  badge: {
    fontSize: 13,
    border: 'none',
    background: 'none',
  },
}));
