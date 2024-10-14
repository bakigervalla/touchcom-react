import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  table: {
    height: '100%',
    minHeight: 500,
    marginTop: 10,

    '&.InovuaReactDataGrid': {
      borderLeft: 'unset',
      borderRight: 'unset',
      borderBottom: 'unset',
    },

    '& .InovuaReactDataGrid__row': {
      '&--active, &--focused': {
        border: 'unset',
        zIndex: 3,
      },
    },

    '& .InovuaReactDataGrid__row--no-zebra.InovuaReactDataGrid__row': {
      '& > *': {
        '&:hover': {
          backgroundColor: `${theme.colors.neutral[0]} !important`,
        },
      },
    },

    '& .InovuaReactDataGrid__row--no-zebra.InovuaReactDataGrid__row--selected':
      {
        '& > *': {
          backgroundColor: `${theme.colors.neutral[2]} !important`,

          '&:hover': {
            backgroundColor: `${theme.colors.neutral[2]} !important`,
          },
        },
      },

    '& .inovua-react-toolkit-menu.inovua-react-toolkit-menu--theme-default-light.inovua-react-toolkit-menu--rtl, .inovua-react-toolkit-menu.inovua-react-toolkit-menu--theme-default-light.inovua-react-toolkit-menu--shadow':
      {
        borderRadius: 6,
        boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)',
      },

    '& .inovua-react-toolkit-menu.inovua-react-toolkit-menu--theme-default-light .inovua-react-toolkit-menu__row--over .inovua-react-toolkit-menu__cell':
      {
        backgroundColor: `${theme.colors.neutral[0]} !important`,
      },

    '& .inovua-react-toolkit-checkbox.inovua-react-toolkit-checkbox--theme-default-light.inovua-react-toolkit-checkbox--checked .inovua-react-toolkit-checkbox__icon-wrapper':
      {
        color: theme.white,
        stroke: theme.white,
        fill: theme.colors.primary[5],
      },

    '& .inovua-react-toolkit-checkbox.inovua-react-toolkit-checkbox--theme-default-light.inovua-react-toolkit-checkbox--indeterminate .inovua-react-toolkit-checkbox__icon-wrapper svg':
      {
        stroke: theme.white,
        background: theme.colors.primary[5],
      },

    '& .inovua-react-toolkit-checkbox.inovua-react-toolkit-checkbox--theme-default-light.inovua-react-toolkit-checkbox--unchecked .inovua-react-toolkit-checkbox__icon-wrapper':
      {
        stroke: theme.colors.neutral[2],
      },

    '& .InovuaReactDataGrid__body': {
      '& .InovuaReactDataGrid__column-layout': {
        '& .InovuaReactDataGrid__header-layout': {
          '& .InovuaReactDataGrid__header-wrapper': {
            '& .InovuaReactDataGrid__header': {
              background: theme.colors.neutral[0],
            },
          },
        },
      },
    },
  },
}));
