import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  accessLevelContainer: { flexDirection: 'column', gap: 28, height: '100%' },
  headerContainer: { alignItems: 'center', width: '100%', gap: 20 },
  tabsContainer: { height: '80%' },
  tabContainer: { height: '95%', paddingTop: 28 },
  title: { fontSize: 19, fontWeight: 400 },
  button: {
    height: 40,
    padding: '8px 18px',

    '&.filter': {
      marginLeft: 25,
      padding: '8px 0',
    },
  },
  notFoundContainer: {
    gap: 24,
    margin: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSchedulesContainer: {
    gap: 28,
    height: '100%',
    flexDirection: 'column',
  },
  scheduleInfo: {
    color: theme.colors.neutral[5],

    '& > b': {
      color: theme.colors.neutral[8],
    },
  },
}));
