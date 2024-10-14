import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  usersContainer: {
    gap: 28,
    height: '100%',
    flexDirection: 'column',
  },
  contentContainer: { flexDirection: 'column', gap: 18, height: '100%' },
  actionsContainer: {
    gap: 8,
    width: '100%',
  },
  button: {
    height: 40,
    padding: '8px 18px',

    '&.filter': {
      marginLeft: 25,
      padding: '8px 0',
    },
  },
  attachUserInput: { marginLeft: 'auto' },
}));
