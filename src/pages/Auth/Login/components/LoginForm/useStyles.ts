import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.colors.neutral[2]}`,
    background: theme.white,
    boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.10)',
    gap: 20,
    padding: '40px 40px 32px 40px',
    borderRadius: 10,
  },

  loginFormText: {
    fontSize: 22,
    fontWeight: 700,
    alignSelf: 'center',
  },

  forgotPassword: {
    alignSelf: 'center',
  },
}));
