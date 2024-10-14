import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  detailsPageLayout: {
    overflow: 'auto',
    padding: '28px 32px',

    '& .configurationIcon': {
      transform: 'rotate(90deg)',
    },
  },
  tabsContainer: {
    height: '100%',
    padding: '10px 0 10px 0',

    '& .mantine-Tabs-panel': {
      padding: 32,
      border: `1px solid ${theme.colors.neutral[2]}`,
    },
  },
  tabContainer: { height: '90%' },
}));
