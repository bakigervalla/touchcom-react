import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  wizardWrapperContainer: {
    flexDirection: 'column',
    gap: '1.5em',
    height: '100%',
  },
  stepTitleContainer: { gap: '0.5em', alignItems: 'center' },
  stepTitle: {
    fontSize: 20,
    fontWeight: 700,
    [theme.breakpoints.md]: { fontSize: 18 },
  },
  childrenContainer: {
    flexDirection: 'column',
    gap: '0.5em',
    height: '85%',
  },
}));
