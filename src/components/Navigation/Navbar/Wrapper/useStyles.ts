import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  navbarWrapperContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    gap: 20,

    '&.showBackground': {
      background: 'white',
      boxShadow: 'rgb(0 0 0 / 3%) 0px 2px 27px',
      borderRadius: 10,
      padding: '3px 20px',
    },

    '& .icon': {
      cursor: 'pointer',
      '& > *': {
        color: theme.colors.neutral[8],
        backgroundColor: theme.colors.neutral[1],
      },
    },
  },

  navbarWrapperActionsContainer: {
    display: 'flex',
    marginLeft: '3%',
    gap: '2em',
  },

  chip: {
    width: 'max-content',
    margin: 10,
    color: 'white',
    fontWeight: 700,
    backgroundColor: 'grey',
    fontSize: 11,
    padding: '5px 15px',
  },
}));
