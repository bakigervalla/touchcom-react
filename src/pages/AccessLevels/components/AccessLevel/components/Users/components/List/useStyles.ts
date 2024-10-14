import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  button: {
    height: 40,
    padding: '8px 18px',
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
  actionIcon: { color: theme.colors.neutral[4], cursor: 'pointer' },
}));
