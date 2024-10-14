import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  connectedUsersContainer: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
    height: '100%',
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
  attachUserInput: {
    marginLeft: 'auto',
  },
  submitButton: { height: 40, padding: '8px 26px' },
}));
