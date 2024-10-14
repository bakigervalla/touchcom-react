import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  accessKeysContainer: {
    width: '50%',
    gap: 18,
    flexDirection: 'column',
    padding: '28px 32px',
    border: `1px solid ${theme.colors.neutral[2]}`,
  },
  attachAccessKeyInput: { marginRight: 'auto' },
  notFoundContainer: {
    gap: 24,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    padding: '8px 18px',
  },
}));
