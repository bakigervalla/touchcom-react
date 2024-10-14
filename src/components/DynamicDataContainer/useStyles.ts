import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  dynamicDataContainer: {
    padding: 16,
    width: '100%',
    borderRadius: 4,
    cursor: 'pointer',
    alignItems: 'center',
    placeContent: 'space-between',
    border: `1px solid ${theme.colors.neutral[2]}`,

    '&:hover': {
      border: `1px solid ${theme.colors.neutral[5]}`,
    },

    '&.active, &:active': {
      border: `1px solid ${theme.colors.neutral[7]}`,
      background: theme.colors.neutral[0],
    },

    '& > *': {
      flexBasis: '100%',

      '& > *': {
        display: 'flex',
        marginLeft: 'auto',
      },
    },
  },
}));
