import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  tabsContainer: { height: '100%', padding: '0 32px 28px 32px' },
  tabContainer: { height: '70%', position: 'relative' },
  actionsContainer: {
    padding: '100px 0 28px 0',
    gap: 8,
  },
  button: {
    height: 40,
    padding: '8px 18px',

    '&.filter': {
      marginLeft: 120,
      padding: '8px 0',
    },
  },
  notFoundWrapper: {
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
  notFoundContainer: { height: 'unset' },
  title: { padding: '28px 32px' },
  search: { marginLeft: 'auto' },
  submitButton: { height: 40, padding: '8px 26px' },
  userDialog: { '& .mantine-Modal-content': { width: 550 } },
}));
