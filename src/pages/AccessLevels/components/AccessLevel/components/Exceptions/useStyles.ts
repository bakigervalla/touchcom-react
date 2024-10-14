import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  exceptionsContainer: {
    gap: 28,
    height: '100%',
    flexDirection: 'column',
  },
  contentContainer: { flexDirection: 'column', gap: 18, height: '100%' },
  button: {
    height: 40,
    padding: '8px 18px',

    '&.add': {
      color: theme.colors.neutral[3],
      marginLeft: 'auto',
    },
  },
  notFoundContainer: {
    gap: 24,
    margin: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    '&.InovuaReactDataGrid': {
      borderTop: 'unset',
    },

    '& .InovuaReactDataGrid__header-wrapper': {
      '& .InovuaReactDataGrid__column-header__resize-wrapper': {
        border: 'unset',
      },
      '& .InovuaReactDataGrid__header': {
        border: 'unset',
        background: `${theme.white} !important`,
      },
    },

    '& .InovuaReactDataGrid__row-cell-wrap': {
      borderRadius: 4,
      border: `1px solid ${theme.colors.neutral[2]}`,
    },

    '& .InovuaReactDataGrid__row-cell-wrap .InovuaReactDataGrid__cell': {
      borderLeft: 'unset',
    },
  },
  actionIcon: {
    cursor: 'pointer',
    color: theme.colors.neutral[2],
  },
}));
