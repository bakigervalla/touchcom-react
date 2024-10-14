import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  snackbar: {
    '&.notistack-MuiContent': {
      fontWeight: 600,
      backgroundColor: theme.colors.neutral[7],
      border: `1px solid ${theme.colors.neutral[2]}`,

      '& .iconContainer': {
        height: 22,
        width: 22,
        padding: 2,
        borderRadius: 8,
        alignItems: 'center',
        color: theme.white,
        backgroundColor: theme.colors.neutral[6],

        '& svg': { cursor: 'pointer', height: 15 },

        '&:hover': {
          backgroundColor: theme.colors.neutral[6],
        },
      },
    },
    '&.notistack-MuiContent-success': {
      color: theme.colors.success[5],
      backgroundColor: theme.colors.success[0],
      border: `1px solid ${theme.colors.success[2]}`,

      '& .iconContainer': {
        color: theme.white,
        backgroundColor: theme.colors.success[4],

        '&:hover': {
          backgroundColor: theme.colors.success[4],
        },
      },
    },
    '&.notistack-MuiContent-info': {
      color: theme.colors.info[4],
      backgroundColor: theme.colors.info[0],
      border: `1px solid ${theme.colors.info[2]}`,

      '& .iconContainer': {
        backgroundColor: theme.colors.info[2],
        color: theme.white,

        '&:hover': {
          backgroundColor: theme.colors.info[2],
        },
      },
    },
    '&.notistack-MuiContent-warning': {
      color: theme.colors.warning[5],
      backgroundColor: theme.colors.warning[0],
      border: `1px solid ${theme.colors.warning[2]}`,

      '& .iconContainer': {
        backgroundColor: theme.colors.warning[2],
        color: theme.white,

        '&:hover': {
          backgroundColor: theme.colors.warning[2],
        },
      },
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: theme.colors.danger[5],
      border: `1px solid ${theme.colors.danger[2]}`,

      '& .iconContainer': {
        backgroundColor: theme.colors.danger[4],
        color: theme.white,

        '&:hover': {
          backgroundColor: theme.colors.danger[4],
        },
      },
    },
    '&.notistack-MuiContent-default': {
      backgroundColor: theme.colors.neutral[7],
      border: `1px solid ${theme.colors.neutral[2]}`,

      '& .iconContainer': {
        backgroundColor: theme.colors.neutral[6],
        color: theme.white,

        '&:hover': {
          backgroundColor: theme.colors.neutral[6],
        },
      },
    },
  },
}));
