import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  cardViewGrid: { height: '85%', width: '100%', gap: 20, overflow: 'auto' },
  cardViewGridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `1px solid ${theme.colors.neutral[2]}`,
    backgroundColor: theme.white,
    boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: 10,
    width: '24%',
    gap: 24,
    height: '90%',
    padding: '40px 25px 30px 25px',
  },
  siteStatus: { marginLeft: 'auto' },
  image: {
    height: '80%',
    width: '80%',
    borderRadius: 15,
    background: theme.colors.primary[0],
  },
  locationContainer: {
    alignItems: 'center',

    '& .icon': {
      color: theme.colors.info[3],
      fill: theme.colors.info[3],
    },

    '& .text': {
      fontSize: 13,
      color: theme.colors.neutral[4],
    },
  },
  buttonsContainer: {
    width: '100%',
    gap: 10,

    '& .button': {
      width: '100%',
      height: 40,
    },
  },
}));
