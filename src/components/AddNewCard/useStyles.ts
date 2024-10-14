import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  addNewCardContainer: {
    height: '90%',
    width: '24%',
    borderRadius: 10,
    paddingBottom: 40,
    cursor: 'pointer',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    background: theme.white,
    border: `1px dashed ${theme.colors.neutral[6]}`,
    boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.10)',

    '& .icon': {
      marginTop: 'auto',
      '& > *': {
        backgroundColor: theme.colors.neutral[1],
      },
    },

    '& .text': {
      fontSize: 18,
      marginTop: 'auto',
    },
  },
}));
