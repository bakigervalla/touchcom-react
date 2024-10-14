import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  savedKeysContainer: { flexDirection: 'column', gap: 28, height: '100%' },
  contentContainer: { flexDirection: 'column', gap: 18, height: '100%' },
  actionsContainer: {
    gap: 8,
    width: '100%',
  },
  button: {
    height: 40,
    padding: '8px 18px',
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
  notFoundContainer: {
    gap: 24,
    margin: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    gap: 6,
    alignItems: 'center',

    '& .iconContainer': {
      background: theme.colors.neutral[5],
    },
  },
  actionIcon: {
    cursor: 'pointer',
    color: theme.colors.neutral[2],
  },
}));
