import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  adminContainer: { flexDirection: 'column', gap: 28, height: '100%' },
  contentContainer: { flexDirection: 'column', gap: 18, height: '100%' },
  actionsContainer: { gap: 8, width: '100%', paddingTop: 40 },
  button: {
    height: 40,
    padding: '8px 18px',
    '&.filter': {
      marginLeft: 120,
      padding: '8px 0',
    },
    '&.create': {
      marginLeft: 'auto',
    },
  },
  notFoundContainer: {
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& div:first-of-type': {
      height: 'unset',
    },
  },
  submitButton: { height: 40, padding: '8px 26px' },
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
      border: 'unset',
    },

    '& .InovuaReactDataGrid__row-cell-wrap .InovuaReactDataGrid__cell': {
      borderLeft: 'unset',
    },
  },
  nameCell: { gap: 6, alignItems: 'center', cursor: 'pointer' },
  cell: {
    gap: 6,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',

    '& .icon': { color: theme.colors.neutral[3] },
  },
}));
