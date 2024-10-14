import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  permissionContainer: {
    gap: 28,
    overflow: 'auto',
    flexDirection: 'column',
  },
  infoBox: {
    height: 'max-content',
    boxShadow: 'unset',
    border: 'none',
    background: theme.colors.neutral[0],
    padding: '10px 0 10px 22px',

    '&:before': { background: theme.colors.warning[4] },

    '& .mantine-Text-root': {
      fontSize: 12,
      color: `${theme.colors.neutral[8]} !important`,
    },
  },
}));
