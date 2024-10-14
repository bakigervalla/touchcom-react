import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  siteImage: {
    display: 'flex',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    background: theme.colors.primary[0],
  },
  title: { fontSize: 14, fontWeight: 700 },
  subtitle: { fontSize: 14, color: theme.colors.neutral[5], width: 120 },
  siteInfoContainer: {
    flexDirection: 'column',
    gap: 24,
  },
  radioButtons: {
    justifyContent: 'space-between',
    gap: 24,
    '& label': {
      paddingLeft: '0.4rem',
    },
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'end',
    flexDirection: 'row',
    gap: 20,
    margin: 0,
  },
  text: { fontWeight: 400 },
}));
