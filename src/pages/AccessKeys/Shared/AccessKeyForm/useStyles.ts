import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  accessKeyForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    paddingBottom: 28,
  },
  radioButtonsContainer: { gap: 20, padding: '12px 0 0 0' },
  radioButton: {
    width: '50%',
    borderRadius: 4,
    cursor: 'pointer',
    border: `1px solid ${theme.colors.neutral[2]}`,
    padding: '12px 16px',

    '&:hover': {
      border: `1px solid ${theme.colors.neutral[8]}`,
    },
  },
  button: {
    height: 40,
    width: 'max-content',
    marginLeft: 'auto',
    padding: '8px 22px',
  },
}));
