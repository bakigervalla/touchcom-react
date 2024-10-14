import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  accessLevelsPageLayout: {
    flexDirection: 'row',
    padding: 'unset',
  },
  savedAccessLevelsContainer: {
    gap: 28,
    width: '40%',
    padding: '28px 0 32px 28px',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.colors.neutral[2]}`,
  },
  accessLevelInfoContainer: {
    gap: 28,
    width: '60%',
    padding: '28px 32px',
    flexDirection: 'column',
  },
}));
