import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  accessKeysPageLayout: {
    flexDirection: 'row',
    padding: 'unset',
  },
  createKeyContainer: {
    gap: 28,
    width: '40%',
    padding: '28px 32px',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.colors.neutral[2]}`,
  },
  savedKeysContainer: {
    gap: 28,
    width: '60%',
    padding: '28px 32px',
    flexDirection: 'column',
  },
}));
