import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  additionalInfoContainer: {
    padding: '26px 0 32px 0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 16,
    paddingBottom: 28,
  },
  text: {
    fontSize: 13,
    color: theme.colors.neutral[3],
  },
}));
