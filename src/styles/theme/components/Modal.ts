import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    overlay: {
      background: `${theme.colors.neutral[8]}64`,
    },
    content: {
      borderRadius: 10,
      alignSelf: 'center',
      backgroundColor: theme.white,
    },
    header: {
      borderRadius: '10px 10px 0px 0px',
      backgroundColor: theme.colors.neutral[0],
    },
    title: {
      color: theme.colors.neutral[8],
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '150%',
    },
    body: { padding: '28px !important' },
    close: {
      background: theme.white,
      color: theme.colors.neutral[8],
      '&:hover': { background: theme.white },
    },
  }),
};
