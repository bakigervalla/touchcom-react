import { ButtonStylesParams, MantineTheme } from '@mantine/core';

export default {
  styles: (
    theme: MantineTheme,
    params: ButtonStylesParams,
    { variant }: any,
  ) => {
    if (variant === 'neutral') {
      return {
        root: {
          height: 40,
          padding: '12px 26px',
          color: theme.colors.neutral[5],
          fontSize: 13,
          backgroundColor: theme.white,
          border: `1px solid ${theme.colors.neutral[2]}`,

          '&:hover': {
            backgroundColor: theme.colors.neutral[1],
          },
          '&:active': {
            backgroundColor: theme.colors.neutral[2],
          },
          '&:disabled': {
            color: theme.white,
            backgroundColor: theme.colors.neutral[2],
          },
        },
      };
    }

    if (variant === 'transparent') {
      return {
        root: {
          height: 36,
          padding: '8px 26px',
          borderRadius: 4,
          fontSize: 13,
          color: theme.white,
          border: `1px solid ${theme.white}`,
          background: 'rgba(245, 245, 245, 0.40)',

          '&:hover': {
            background: 'rgba(245, 245, 245, 0.35)',
          },
          '&:active': {
            background: 'rgba(245, 245, 245, 0.3)',
          },
          '&:disabled': {
            color: theme.white,
            background: 'rgba(245, 245, 245, 0.3)',
          },
        },
      };
    }

    if (variant === 'filter') {
      return {
        root: {
          height: 40,
          padding: '12px 0',
          borderRadius: 0,
          color: theme.colors.neutral[7],
          fontSize: 13,
          backgroundColor: theme.white,
          borderBottom: `1px solid ${theme.colors.neutral[2]}`,

          '&:hover': {
            backgroundColor: 'unset',
            borderBottom: `1px solid ${theme.colors.neutral[3]}`,
          },
          '&:active': {
            backgroundColor: 'unset',
            borderBottom: `1px solid ${theme.colors.neutral[4]}`,
          },
          '&:disabled': {
            backgroundColor: 'unset',
            borderBottom: `1px solid ${theme.colors.neutral[1]}`,
          },
        },
      };
    }

    if (variant === 'subtle') {
      return {
        root: {
          color: theme.colors.primary[5],

          '& .mantine-Button-rightIcon': {
            color: theme.colors.primary[6],
          },

          '&:hover': {
            backgroundColor: 'unset',
          },
        },
      };
    }

    if (variant === 'action') {
      return {
        root: {
          height: 40,
          padding: '12px 26px',
          color: theme.white,
          fontSize: 13,
          backgroundColor: theme.colors.neutral[8],

          '&:hover': {
            backgroundColor: theme.colors.neutral[7],
          },
          '&:active': {
            backgroundColor: theme.colors.neutral[8],
          },
          '&:disabled': {
            color: theme.white,
            backgroundColor: theme.colors.neutral[1],
          },
        },
      };
    }

    return {
      root: {
        height: '45px',
        padding: '12px 32px',
        color: theme.white,
        fontSize: 14,
        backgroundColor: theme.colors[params.color || theme.primaryColor][4],

        '&:hover': {
          backgroundColor: theme.colors[params.color || theme.primaryColor][3],
        },
        '&:active': {
          backgroundColor: theme.colors[params.color || theme.primaryColor][5],
        },
        '&:disabled': {
          color: theme.white,
          backgroundColor: theme.colors[params.color || theme.primaryColor][0],
        },
      },
    };
  },
};
