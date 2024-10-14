import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  profileImage: {
    display: 'flex',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    background: theme.colors.primary[0],

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(10, 10, 10, 0.40)',
    },
  },
  userInfoContainer: {
    gap: 20,
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: { fontSize: 16, fontWeight: 500 },
}));
