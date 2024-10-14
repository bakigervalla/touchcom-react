import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  configurationContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  select: {
    width: '25%',

    '& .mantine-Select-label': {
      fontWeight: 700,
      color: theme.colors.neutral[8],
    },
  },
  text: {
    fontWeight: 400,
    color: theme.colors.neutral[5],

    '&.placeholder': {
      color: theme.colors.neutral[5],
    },
  },
  label: {
    fontSize: 13,
    fontWeight: 700,
  },
  button: {
    height: 36,
    padding: '8px 26px',
  },
}));
