import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  authContainer: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: '60px 85px 60px 85px',
    backgroundColor: theme.colors.neutral[0],
  },

  authHeader: {
    width: '100%',
    alignItems: 'center',
    paddingLeft: 70,

    '& .logo': {
      margin: 'auto',
      height: '35px !important',
      width: '175px !important',
    },
  },

  authContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    margin: 'auto',
    placeContent: 'center',
  },

  authFooter: {
    justifyContent: 'center',
  },
}));
