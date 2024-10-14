import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  detailsPageLayout: {
    gap: 24,
    padding: '28px 32px',
  },
  contentContainer: {
    gap: 24,
    padding: 5,
    overflow: 'auto',
    flexDirection: 'column',
  },
  accessInfoContainer: {
    gap: 24,
    paddingBottom: 10,
  },
  tabsContainer: {
    height: '100%',
    padding: '10px 0 10px 0',

    '& .mantine-Tabs-panel': {
      padding: 32,
      minHeight: 300,
      border: `1px solid ${theme.colors.neutral[2]}`,
    },
  },
}));
