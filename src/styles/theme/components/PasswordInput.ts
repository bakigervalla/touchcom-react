import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    root: {
      wrapper: {
        gap: 8,
      },
      label: {
        fontWeight: 600,
        color: theme.colors.neutral[8],
        marginBottom: 8,
      },
      '.mantine-PasswordInput-input': {
        fontSize: 13,
        width: '100%',
        borderRadius: 4,
        fontWeight: 400,
        color: theme.colors.neutral[8],
        border: `1px solid ${theme.colors.neutral[2]}`,

        '&:hover': {
          border: `1px solid ${theme.colors.neutral[4]}`,
        },

        '&:focus-within': {
          border: `1px solid ${theme.colors.neutral[8]}`,
        },
      },
      '.mantine-PasswordInput-rightSection': {
        '& > *': {
          color: theme.colors.neutral[8],
        },
      },
    },
  }),
};
