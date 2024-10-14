import { MantineTheme, NotificationStylesParams } from '@mantine/core';

export default {
  styles: (
    theme: MantineTheme,
    params: NotificationStylesParams,
    { variant }: any,
  ) => {
    if (variant === 'error') {
      return {
        root: {
          padding: '1.25rem 0.625rem 1.25rem 2rem',
          backgroundColor: theme.colors.danger[5],
          border: `1px solid ${theme.colors.danger[2]}`,
          '& .mantine-ActionIcon-root': {
            borderRadius: 8,
            backgroundColor: theme.colors.danger[4],
            color: theme.white,
            '&:hover': {
              backgroundColor: theme.colors.danger[4],
            },
          },
        },
        body: {
          color: theme.white,
        },
        title: {
          color: theme.white,
        },
        description: {
          color: theme.white,
        },
      };
    }

    if (variant === 'info') {
      return {
        root: {
          padding: '1.25rem 0.625rem 1.25rem 2rem',
          backgroundColor: theme.colors.info[0],
          border: `1px solid ${theme.colors.info[2]}`,
          '& .mantine-ActionIcon-root': {
            borderRadius: 8,
            backgroundColor: theme.colors.info[2],
            color: theme.white,
            '&:hover': {
              backgroundColor: theme.colors.info[2],
            },
          },
        },
        body: {
          color: theme.colors.info[6],
        },
        title: {
          color: theme.colors.info[6],
        },
        description: {
          color: theme.colors.info[6],
        },
      };
    }
    if (variant === 'warning') {
      return {
        root: {
          padding: '1.25rem 0.625rem 1.25rem 2rem',
          backgroundColor: theme.colors.warning[0],
          border: `1px solid ${theme.colors.warning[2]}`,
          '& .mantine-ActionIcon-root': {
            borderRadius: 8,
            backgroundColor: theme.colors.warning[2],
            color: theme.white,
            '&:hover': {
              backgroundColor: theme.colors.warning[2],
            },
          },
        },
        body: {
          color: theme.colors.warning[6],
        },
        title: {
          color: theme.colors.warning[6],
        },
        description: {
          color: theme.colors.warning[6],
        },
      };
    }
    if (variant === 'success') {
      return {
        root: {
          padding: '1.25rem 0.625rem 1.25rem 2rem',
          backgroundColor: theme.colors.success[0],
          border: `1px solid ${theme.colors.success[2]}`,
          '& .mantine-ActionIcon-root': {
            borderRadius: 8,
            backgroundColor: theme.colors.success[4],
            color: theme.white,
            '&:hover': {
              backgroundColor: theme.colors.success[4],
            },
          },
        },
        body: {
          color: theme.colors.success[6],
        },
        title: {
          color: theme.colors.success[6],
        },
        description: {
          color: theme.colors.success[6],
        },
      };
    }

    return {
      root: {
        padding: '1.25rem 0.625rem 1.25rem 2rem',
        backgroundColor: theme.colors.neutral[7],
        border: `1px solid ${theme.colors.neutral[2]}`,
        '& .mantine-ActionIcon-root': {
          backgroundColor: theme.colors.neutral[6],
          color: theme.white,
          '&:hover': {
            backgroundColor: theme.colors.neutral[6],
          },
        },
      },
      body: {
        color: theme.white,
      },
      title: {
        color: theme.white,
      },
      description: {
        color: theme.white,
      },
    };
  },
};
