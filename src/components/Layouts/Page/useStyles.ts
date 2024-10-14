import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  pageContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },

  pageChildrenContainer: {
    padding: 15,
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'auto',
    position: 'relative',
    flexDirection: 'column',
  },
}));
