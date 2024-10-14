import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  dashboardPageLayout: {
    padding: '28px 32px',
    gap: 28,
  },
  contentContainer: {
    gap: 20,
    height: '93%',
    flexDirection: 'column',
  },
  infoSection: { height: '20%', gap: 20 },
  overviewSection: { height: '80%', gap: 20 },
  statisticsSection: {
    gap: 24,
    width: '65%',
    padding: '28px 32px',
    flexDirection: 'column',
    border: `1px solid ${theme.colors.neutral[2]}`,
  },
  lastActionsSection: {
    gap: 24,
    width: '35%',
    flexDirection: 'column',
    padding: '28px 0  32px 28px',
    border: `1px solid ${theme.colors.neutral[2]}`,
  },
}));
