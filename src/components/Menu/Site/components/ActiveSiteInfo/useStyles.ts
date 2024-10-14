import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  activeSiteInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 16px',
    gap: 12,
    borderBottom: `1px solid ${theme.colors.neutral[1]}`,
  },

  locationContainer: {
    alignItems: 'center',

    '& .icon': {
      color: theme.colors.info[3],
      fill: theme.colors.info[3],
    },

    '& .text': {
      fontSize: 13,
      color: theme.colors.neutral[4],
    },
  },
}));
