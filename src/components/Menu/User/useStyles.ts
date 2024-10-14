import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  userMenuDropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: 6,
    padding: '8px 0',
    minWidth: 240,

    '*:nth-of-type(4)': {
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    },
  },

  avatarContainer: {
    alignItems: 'center',
  },

  userInfoContainer: {
    gap: 12,
    padding: '8px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',

    '& .userFullName': {
      color: theme.colors.neutral[9],
      fontSize: 16,
      fontWeight: 700,
      lineHeight: '150%',
      letterSpacing: '-0.16px',
    },

    '& .userRole': {
      color: theme.colors.neutral[4],
      fontSize: 13,
      lineHeight: '150%',
    },
  },

  itemContainer: {
    gap: 12,
    height: 40,
    padding: '0px 16px',
    alignItems: 'center',
    cursor: 'pointer',

    '& .languageIcon': {
      height: 20,
      width: 20,
      borderRadius: 50,
    },

    '&.active, &:hover': {
      background: theme.colors.neutral[1],
    },
  },

  languageMenuContainer: {
    padding: '0 0 8px 0',
    boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: 6,
    minWidth: 195,
  },
}));
