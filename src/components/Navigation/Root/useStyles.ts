import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  navigation: {
    display: 'flex',
    height: '100%',
  },

  drawer: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    backgroundColor: theme.colors.neutral[0],
    borderRight: `1px solid ${theme.colors.neutral[2]}`,

    '& .text': {
      alignSelf: 'center',
      fontWeight: 700,
    },
  },

  logo: {
    margin: '23px 24px',
  },
}));
