import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  navbarActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3em',
  },

  navbarActionIcon: {
    display: 'flex',
    alignItems: 'center',
  },

  navbarActionButtonLabel: {
    fontSize: 12,
    fontWeight: 700,
  },
}));
