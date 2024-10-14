import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  buttonsContainer: {
    marginTop: 'auto',
    gap: '0.5em',
    justifyContent: 'right',
  },
  button: {
    height: 40,
    padding: '8px 22px 8px 22px',

    '&.previous': {
      padding: '8px 26px',
      border: `1px solid ${theme.colors.secondary[5]}`,
      backgroundColor: `${theme.colors.secondary[0]}33`,
      color: theme.colors.secondary[6],

      '&:hover': {
        border: `1px solid ${theme.colors.secondary[6]}`,
        backgroundColor: `${theme.colors.secondary[1]}33`,
      },

      '&:active': {
        border: `1px solid ${theme.colors.secondary[7]}`,
        backgroundColor: `${theme.colors.secondary[2]}33`,
      },

      '&:disabled': {
        backgroundColor: theme.white,
        border: `1px solid ${theme.colors.neutral[1]}`,
        color: theme.colors.neutral[3],
      },
    },
  },
}));
