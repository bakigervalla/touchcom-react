import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  buttonsContainer: {
    gap: 10,
    padding: '15px 0',
    marginLeft: 'auto',

    '& .button': {
      height: 36,
      padding: '8px 26px',

      '&.approve': { background: theme.colors.success[5] },

      '&.reject': { background: theme.colors.danger[4] },
    },
  },
}));
