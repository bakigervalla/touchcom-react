import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  button: {
    height: 40,
    padding: '8px 18px',
  },
  notFoundContainer: {
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  nameCell: { gap: 6, alignItems: 'center', cursor: 'pointer' },
  cell: {
    gap: 6,
    alignItems: 'center',
    cursor: 'pointer',

    '& .icon': { color: theme.colors.neutral[3] },
  },
}));
