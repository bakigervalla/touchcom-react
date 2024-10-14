import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  eventsContainer: { flexDirection: 'column', gap: 8, height: '100%' },
  actionsContainer: {
    gap: 8,
    width: '100%',
  },
  button: {
    height: 40,
    padding: '8px 18px',

    '&.filter': {
      marginLeft: 25,
      padding: '8px 0',
    },
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

    '& .InovuaReactDataGrid__row-cell-wrap .InovuaReactDataGrid__cell': {
      borderLeft: 'unset',
    },
  },
  notFoundContainer: { maxWidth: 'unset' },
}));
