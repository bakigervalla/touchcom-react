import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 50,
  },
  configurationContainer: {
    width: '100%',
    paddingBottom: 20,

    '& .button': {
      marginLeft: 'auto',
    },
  },
  loaderContainer: {
    position: 'relative',
    height: '85%',
    width: '100%',
  },
}));
