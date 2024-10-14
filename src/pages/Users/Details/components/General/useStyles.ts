import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  generalContainer: { gap: 48 },
  contentContainer: { flexDirection: 'column', gap: 20, width: '80%' },
  infoContainer: {
    flexDirection: 'column',
    gap: 8,

    '& .text': { fontWeight: 400 },
  },
  avatar: { width: 160, height: 160, borderRadius: 100 },
}));
