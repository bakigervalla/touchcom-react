import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  accessKeyContainer: {
    flexDirection: 'column',
    gap: 10,
    width: 200,
    minHeight: 150,
    padding: '18px 12px 12px 12px',
    border: `1px solid ${theme.colors.neutral[2]}`,
    background: theme.colors.neutral[0],

    '& .link': {
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: 'auto',
      marginLeft: 'auto',
      color: theme.colors.neutral[4],
    },

    '& .buttonContainer': {
      padding: '12px 0 0 0',
      borderTop: `1px solid ${theme.colors.neutral[2]}`,
    },
  },
}));
