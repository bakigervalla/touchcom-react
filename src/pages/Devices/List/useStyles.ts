import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  devicesContainer: {
    padding: '28px 32px',
    flexDirection: 'column',
  },
  actionsContainer: {
    padding: '100px 0 28px 0',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
  },
  button: {
    height: 40,
    padding: '8px 18px',
    '&.filter': {
      marginLeft: 120,
      padding: '8px 0',
    },
    '&.create': {
      marginLeft: 'auto',
    },
  },
  notFoundContainer: {
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& div:first-of-type': {
      height: 'unset',
    },
  },
  title: { padding: '32px 0' },
  nameCell: { gap: 6, alignItems: 'center', cursor: 'pointer' },
}));
