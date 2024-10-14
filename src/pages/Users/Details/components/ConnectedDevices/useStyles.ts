import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  connectedDevicesContainer: { flexDirection: 'column', gap: 8 },
  innerContainer: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
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
  attachDeviceInput: { marginLeft: 'auto' },
}));
