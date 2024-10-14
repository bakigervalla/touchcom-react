import { MantineTheme } from '@mantine/core';

export default {
  styles: (theme: MantineTheme) => ({
    body: {
      '& input:checked+*': {
        border: `1px solid ${theme.colors.success[6]}`,
        backgroundColor: theme.colors.success[6],

        '& > *': {
          left: 'calc(100% - 0.875rem - 0.3rem)',
        },
      },
    },
    track: {
      width: 20,
      height: 23,
    },
    thumb: {
      width: 17,
      height: 17,
    },
  }),
};
