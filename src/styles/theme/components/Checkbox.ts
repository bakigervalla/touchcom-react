import { CheckboxStylesParams, MantineTheme } from '@mantine/core';

export default {
  styles: (
    theme: MantineTheme,
    params: CheckboxStylesParams,
    { size }: any,
  ) => {
    if (size === 'sm') {
      return {
        root: {
          '& .mantine-Checkbox-inner': {
            width: 14,
            height: 14,
          },
          '& .mantine-Checkbox-body': { alignItems: 'center' },
          input: {
            cursor: 'pointer',
            borderRadius: 2,
            width: 14,
            height: 14,
            backgroundColor: theme.white,
            border: `0.0625rem solid ${theme.colors.neutral[2]}`,
            '&:checked': {
              backgroundColor: theme.colors.primary[5],
              border: `0.0625rem solid ${theme.colors.primary[5]}`,

              '&:hover': {
                border: `0.0625rem solid ${theme.colors.primary[5]}`,
              },

              '&:disabled': {
                '&:hover': {
                  border: `0.0625rem solid ${theme.colors.primary[5]}`,
                },
              },
            },
            '&:hover': {
              border: `0.0625rem solid ${theme.colors.neutral[7]}`,
            },
            '&:disabled': {
              '&:hover': {
                border: `0.0625rem solid ${theme.colors.neutral[2]}`,
              },
            },
          },
        },
      };
    }
    return {
      root: {
        '& .mantine-Checkbox-inner': {
          width: 20,
          height: 20,
        },
        input: {
          borderRadius: 2,
          cursor: 'pointer',
          width: 20,
          height: 20,
          backgroundColor: theme.white,
          border: `0.0625rem solid ${theme.colors.neutral[2]}`,
          '&:checked': {
            backgroundColor: theme.colors.primary[5],
            border: `0.0625rem solid ${theme.colors.primary[5]}`,

            '&:hover': {
              border: `0.0625rem solid ${theme.colors.primary[5]}`,
            },

            '&:disabled': {
              '&:hover': {
                border: `0.0625rem solid ${theme.colors.primary[5]}`,
              },
            },
          },
          '&:hover': {
            border: `0.0625rem solid ${theme.colors.neutral[7]}`,
          },
          '&:disabled': {
            '&:hover': {
              border: `0.0625rem solid ${theme.colors.neutral[2]}`,
            },
          },
        },
      },
    };
  },
};
