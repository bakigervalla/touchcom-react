import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  lastActionsContainer: {
    gap: 18,
    width: '100%',
    margin: 'auto',
    overflow: 'auto',
    flexDirection: 'column',
  },
  notFoundContainer: {
    maxWidth: '100%',
    paddingRight: 28,
    alignItems: 'center',
  },
}));
