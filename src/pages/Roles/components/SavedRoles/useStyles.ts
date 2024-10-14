import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  savedRolesContainer: {
    gap: 10,
    height: '90%',
    flexDirection: 'column',

    '& .newRoleContainer': {
      paddingRight: 28,
    },
  },
  rolesList: {
    gap: 10,
    paddingRight: 28,
    flexDirection: 'column',
    overflow: 'auto',
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'start',
  },
  actionIcon: { transform: 'rotate(-90deg)' },
}));
