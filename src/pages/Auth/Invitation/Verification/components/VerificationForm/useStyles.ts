import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  verificationForm: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.colors.neutral[2]}`,
    background: theme.white,
    boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.10)',
    gap: 20,
    padding: '40px 40px 32px 40px',
    borderRadius: 10,
  },

  verificationFormText: {
    fontSize: 22,
    fontWeight: 700,
    alignSelf: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: theme.colors.neutral[5],
    textAlign: 'center',

    '&.main': { fontSize: 14 },

    '& .link': {
      fontWeight: 700,
      color: theme.colors.primary[5],
    },
  },
}));
