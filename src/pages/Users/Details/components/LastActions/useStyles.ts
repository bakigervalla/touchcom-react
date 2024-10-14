import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  lastActionsContainer: {
    width: '50%',
    gap: 18,
    flexDirection: 'column',
    padding: '28px 32px',
    border: `1px solid ${theme.colors.neutral[2]}`,
  },
  notFoundContainer: { maxWidth: 'unset' },
}));
