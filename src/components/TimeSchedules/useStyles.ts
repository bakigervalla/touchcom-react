import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  timeSchedulesContainer: {
    flexDirection: 'column',
    gap: 18,
    overflow: 'auto',
  },
  scheduleItem: {
    alignItems: 'center',

    '& > div:nth-of-type(1)': {
      width: '23%',
    },
  },
}));
