import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  savedAccessLevelsContainer: {
    gap: 10,
    height: '90%',
    flexDirection: 'column',

    '& .newAccessLevelContainer': {
      paddingRight: 28,
    },
  },
  accessLevelsList: {
    gap: 10,
    overflow: 'auto',
    paddingRight: 28,
    flexDirection: 'column',
  },
  actionIcon: { transform: 'rotate(-90deg)' },
}));
