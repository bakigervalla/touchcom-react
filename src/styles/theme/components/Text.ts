import { MantineTheme, TextStylesParams } from '@mantine/core';

export default {
  styles: (theme: MantineTheme, params: TextStylesParams, { variant }: any) => {
    if (variant === 'subtitle') {
      return {
        root: {
          fontSize: 13,
          color: theme.colors.neutral[5],
        },
      };
    }

    return {
      root: {
        fontWeight: 400,
        fontSize: 14,
        color: theme.colors.neutral[8],
      },
    };
  },
};
