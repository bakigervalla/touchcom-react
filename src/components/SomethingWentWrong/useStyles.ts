import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  somethingWentWrongContainer: {
    alignItems: 'center',
    backgroundColor: theme.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 15,
    textAlign: 'center',

    '& .logo': {
      height: '55px !important',
      width: '255px !important',
    },
  },

  logo: {
    height: 125,
  },

  title: {
    fontSize: 35,
    fontWeight: 700,
    margin: 20,
  },

  text: {
    fontWeight: 'normal',
  },

  detailsContainer: {
    marginTop: 20,
    maxWidth: '100%',
    overflow: 'auto',
    padding: '0 25px',
  },

  error: {
    fontWeight: 700,
  },

  errorInfoContainer: {
    margin: 'auto',

    '& > *': {
      whiteSpace: 'break-spaces',
    },
  },
}));
