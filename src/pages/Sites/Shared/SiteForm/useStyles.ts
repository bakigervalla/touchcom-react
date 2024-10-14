import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  siteForm: {
    width: 548,
    display: 'flex',
    gap: 28,
  },
  image: {
    display: 'flex',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    background: theme.colors.primary[0],
  },
  buttonsContainer: {
    gap: 10,
    padding: '10px 0',
  },
  cancelButton: {
    width: '35%',
  },
  submitButton: {
    width: '65%',
    height: 40,
  },
}));
