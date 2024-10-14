import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  credentialsForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
  },
  inputContainer: { width: '100%', gap: 20, alignItems: 'center' },
  label: { fontWeight: 700 },
}));
