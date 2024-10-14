import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  propertyContainer: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: '60px 85px 0 85px',
    backgroundColor: theme.colors.neutral[0],
  },

  propertyHeader: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 70,

    '& .icon': {
      cursor: 'pointer',
      '& > *': {
        color: theme.colors.neutral[8],
        backgroundColor: theme.colors.neutral[1],
      },
    },

    '& .logo': {
      margin: 'auto',
      height: '35px !important',
      width: '175px !important',
    },
  },

  propertyContent: {
    height: '85%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
}));
