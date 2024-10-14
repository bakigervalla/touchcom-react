import { MantineTheme } from '@mantine/core';

export default (globalTheme: MantineTheme) => ({
  'html, body, #root': {
    height: '100vh',
    width: '100vw',
    margin: 0,
    backgroundColor: globalTheme.white,
  },
  '*::-webkit-scrollbar': {
    height: 5,
    width: 5,
    color: 'grey',
    cursor: 'pointer',
    [globalTheme.breakpoints.md]: {
      height: 3,
      width: 3,
    },
  },
  '*::-webkit-scrollbar-track:hover': {
    boxShadow: 'inset 0 0 5px #c0c0c0',
    borderRadius: 10,
    [globalTheme.breakpoints.md]: {
      boxShadow: 'inset 0 0 3px #c0c0c0',
    },
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 10,
  },
  '*::-webkit-scrollbar-thumb:hover': {
    backgroundColor: globalTheme.colors.primary[4],
  },
  '* a': {
    color: globalTheme.colors.neutral[6],
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 500,
  },
});
