import { MantineTheme, SelectProps } from '@mantine/core';

export default {
  styles: (
    theme: MantineTheme,
    params: SelectProps,
    { variant, size }: any,
  ) => {
    if (variant === 'underlined') {
      return {
        label: {
          color: theme.colors.primary[5],
          marginBottom: 8,
        },
        wrapper: {
          borderRadius: 0,
          borderBottom: `0.063rem solid ${theme.colors.neutral[2]}`,
          '&:hover': {
            borderBottom: `0.063rem solid ${theme.colors.neutral[5]}`,
          },
          '&:active': {
            borderBottom: `0.063rem solid ${theme.colors.neutral[8]}`,
          },
          '&[data-invalid]': {
            border: 'none',
          },
        },
        rightSection: {
          pointerEvents: 'none' as const,
        },
        input: {
          width: '100%',
          border: 'none',
          outline: 'none',
          borderRadius: 0,
          color: theme.colors.neutral[8],
          padding: '0rem 0.75rem 0rem 1rem',
          '&:hover': {
            border: 'none',
          },
          '&:focus-visible': {
            borderBottom: `0.063rem solid ${theme.colors.neutral[8]}`,
          },
          '&[data-invalid]': {
            borderBottom: `0.063rem solid ${theme.colors.danger[5]} !important`,
          },
        },
        error: {},
        item: {
          '&[data-selected]': {
            '&, &:hover': {
              cursor: 'default',
              backgroundColor: theme.colors.neutral[1],
              color: theme.colors.neutral[8],
              fontWeight: 700,
            },
          },
        },
      };
    }

    if (size === 'sm') {
      return {
        label: {
          fontWeight: 600,
          color: theme.colors.neutral[8],
          marginBottom: 8,
        },
        wrapper: {
          borderRadius: 4,
          border: `0.063rem solid ${theme.colors.neutral[2]}`,
          '&:hover': {
            border: `0.063rem solid ${theme.colors.neutral[5]}`,
          },
          '&:focus-within': {
            border: `0.063rem solid ${theme.colors.neutral[8]}`,
          },
          '&[data-invalid]': {
            border: `0.063rem solid ${theme.colors.danger[5]} !important`,
          },
        },
        rightSection: {
          pointerEvents: 'none' as const,
        },
        input: {
          width: '100%',
          minHeight: 'unset',
          height: '2.15rem',
          borderRadius: 4,
          color: theme.colors.neutral[8],
          padding: '0rem 0.75rem 0rem 1rem',
          border: 'unset',
          '&:hover': {
            border: 'unset',
          },
          '&:focus-within': {
            border: 'unset',
          },
          '&[data-invalid]': {
            border: `0.063rem solid ${theme.colors.danger[5]}`,
          },
        },
        error: {
          border: 'unset',
        },
        item: {
          '&[data-selected]': {
            '&, &:hover': {
              cursor: 'default',
              backgroundColor: theme.colors.neutral[1],
              color: theme.colors.neutral[8],
              fontWeight: 700,
            },
          },
        },
      };
    }

    return {
      label: {
        fontWeight: 600,
        color: theme.colors.neutral[8],
        marginBottom: 8,
        height: 16,
      },
      wrapper: {
        borderRadius: 4,
        border: `0.063rem solid ${theme.colors.neutral[2]}`,
        '&:hover': {
          border: `0.063rem solid ${theme.colors.neutral[5]}`,
        },
        '&:focus-within': {
          border: `0.063rem solid ${theme.colors.neutral[8]}`,
        },
        '&[data-invalid]': {
          border: `0.063rem solid ${theme.colors.danger[5]} !important`,
        },
      },
      rightSection: {
        pointerEvents: 'none' as const,
      },
      input: {
        width: '100%',
        borderRadius: 4,
        color: theme.colors.neutral[8],
        padding: '0rem 0.75rem 0rem 1rem',
        border: 'unset',
        outline: 'none',
        '&:hover': {
          border: 'unset',
        },
        '&:focus-within': {
          border: 'unset',
        },
        '&[data-invalid]': {
          border: 'unset',
        },
      },
      error: {},
      item: {
        '&[data-selected]': {
          '&, &:hover': {
            cursor: 'default',
            backgroundColor: theme.colors.neutral[1],
            color: theme.colors.neutral[8],
            fontWeight: 700,
          },
        },
      },
    };
  },
};
