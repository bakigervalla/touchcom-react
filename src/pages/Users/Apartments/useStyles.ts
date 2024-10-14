import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  nameCell: { gap: 6, alignItems: 'center', cursor: 'pointer' },
  userContainer: {
    gap: 6,
    alignItems: 'center',

    '& .iconContainer': {
      background: theme.colors.neutral[5],
    },
  },
  notFoundWrapper: {
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
  notFoundContainer: { height: 'unset' },
  button: {
    height: 40,
    padding: '8px 18px',
  },
}));
