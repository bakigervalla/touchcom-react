import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  generalContainer: { gap: 24 },
  headerContainer: {
    flexDirection: 'column',
    gap: 6,

    '& .title': { fontSize: 22, fontWeight: 500 },
  },
  contentContainer: {
    flexDirection: 'column',
    gap: 14,
    width: '80%',

    '& .text': { color: theme.colors.neutral[4], fontWeight: 400 },
  },
  avatar: { width: 130, height: 130, borderRadius: 8 },
  avatarButton: { padding: '8px 13px' },
  icon: { color: theme.colors.primary[3], cursor: 'pointer' },
}));
