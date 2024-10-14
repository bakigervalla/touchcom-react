import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  mainContainer: { flexDirection: 'column', gap: 28, height: '100%' },
  headerContainer: { alignItems: 'center', width: '100%', gap: 20 },
  notFoundContainer: {
    gap: 24,
    margin: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 22, fontWeight: 500 },
  button: {
    height: 36,
    padding: '8px 24px',
  },
}));
