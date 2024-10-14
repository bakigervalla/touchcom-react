import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  languageMenuContainer: {
    padding: '0 0 8px 0',
    boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: 6,
    minWidth: 195,
  },

  switchContainer: {
    gap: 7,
    width: 80,
    borderRadius: 4,
    cursor: 'pointer',
    alignItems: 'center',
    padding: '6px 6px 6px 10px',
    border: `1px solid ${theme.colors.neutral[2]}`,
    backgroundColor: theme.white,

    '& .languageIcon': {
      height: 20,
      width: 20,
      borderRadius: 50,
    },

    '& .icon': {
      marginLeft: 'auto',
      color: theme.colors.neutral[3],
    },
  },
}));
