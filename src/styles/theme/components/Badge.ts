import { BadgeStylesParams, MantineTheme } from '@mantine/core';

export default {
  styles: (
    theme: MantineTheme,
    params: BadgeStylesParams,
    { variant }: any,
  ) => {
    if (variant === 'filter') {
      return {
        root: {
          fontSize: 13,
          height: 25,
          fontWeight: 400,
          textTransform: 'capitalize' as const,
          color: theme.colors.neutral[6],
          border: `1px solid ${theme.colors.info[2]}`,

          '& > span .highlighted': {
            color: theme.colors.info[5],
            fontWeight: 600,
          },

          '& .mantine-Badge-rightSection': {
            display: 'flex',
            cursor: 'pointer',
            color: `${theme.colors.neutral[6]}77`,
          },
        },
      };
    }

    if (variant === 'primary') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.primary[5],
          backgroundColor: theme.colors.primary[0],
        },
      };
    }

    if (variant === 'primary-outlined') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.primary[5],
          backgroundColor: `${theme.colors.primary[0]}60`,
          border: `1px solid ${theme.colors.primary[5]}`,
        },
      };
    }

    if (variant === 'secondary') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.secondary[5],
          backgroundColor: theme.colors.secondary[0],
        },
      };
    }

    if (variant === 'secondary-outlined') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.secondary[5],
          backgroundColor: `${theme.colors.secondary[0]}60`,
          border: `1px solid ${theme.colors.secondary[5]}`,
        },
      };
    }

    if (variant === 'info') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.secondary[8],
          backgroundColor: `${theme.colors.secondary[0]}33`,
          border: `1px solid ${theme.colors.secondary[4]}`,
        },
      };
    }

    if (variant === 'success') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.success[5],
          backgroundColor: theme.colors.success[0],
        },
      };
    }

    if (variant === 'warning') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.warning[5],
          backgroundColor: theme.colors.warning[0],
        },
      };
    }

    if (variant === 'warning-outlined') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.warning[8],
          backgroundColor: `${theme.colors.warning[0]}33`,
          border: `1px solid ${theme.colors.warning[4]}`,
        },
      };
    }

    if (variant === 'danger') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.danger[5],
          backgroundColor: theme.colors.danger[0],
        },
      };
    }

    if (variant === 'danger-outlined') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.danger[5],
          backgroundColor: `${theme.colors.danger[0]}33`,
          border: `1px solid ${theme.colors.danger[4]}`,
        },
      };
    }

    if (variant === 'neutral-outlined') {
      return {
        root: {
          fontSize: 13,
          textTransform: 'capitalize' as const,
          color: theme.colors.neutral[8],
          backgroundColor: theme.colors.neutral[0],
          border: `1px solid ${theme.colors.neutral[3]}`,
        },
      };
    }

    return {
      root: {
        fontSize: 13,
        textTransform: 'capitalize' as const,
        color: theme.colors.neutral[5],
        backgroundColor: theme.colors.neutral[0],
      },
    };
  },
};
