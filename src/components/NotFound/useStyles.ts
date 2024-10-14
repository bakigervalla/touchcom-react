import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  container: {
    color: theme.colors.primary[4],
    alignItems: 'center',
    placeContent: 'center',
    flexDirection: 'column',
    gap: '1.5em',
    height: '100%',
    maxWidth: 320,
  },
  icon: {
    fontSize: '13em',
    opacity: 0.8,
    color: theme.colors.neutral[5],
    [theme.breakpoints.md]: {
      fontSize: '9em',
    },
    [theme.breakpoints.xs]: {
      fontSize: '6em',
    },
  },
  label: { fontWeight: 600 },
  description: {
    fontSize: 13,
    fontWeight: 400,
    color: theme.colors.neutral[5],
    textAlign: 'center',
    [theme.breakpoints.md]: {
      fontSize: 10,
    },
    [theme.breakpoints.xs]: {
      fontSize: 7,
    },
  },
}));
