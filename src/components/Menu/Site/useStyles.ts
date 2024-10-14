import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  siteMenuContainer: {
    gap: 12,
    cursor: 'pointer',
    margin: '20px 24px',
    padding: '10px 12px',
    alignItems: 'center',
    backgroundColor: theme.white,

    '& .image': {
      height: 35,
      width: 35,
      background: theme.colors.primary[0],
    },

    '& .text': {
      fontSize: 14,
      fontWeight: 700,
    },

    '& .icon': {
      marginLeft: 'auto',
    },
  },

  sitesOverviewContainer: {
    padding: '0 0 8px 0',
    boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: 6,
    minWidth: 300,

    '& .image': {
      height: 72,
      width: 72,
      background: theme.colors.primary[0],
    },

    '& .viewAllSection': {
      cursor: 'pointer',
      padding: '8px 16px',
      justifyContent: 'center',

      '& .text': {
        color: theme.colors.neutral[4],
      },

      '&.active, &:hover': {
        background: theme.colors.neutral[1],
      },
    },
  },

  itemContainer: {
    gap: 12,
    height: 40,
    padding: '0 16px',
    alignItems: 'center',
    cursor: 'pointer',

    '&:nth-of-type(3)': {
      borderBottom: `1px solid ${theme.colors.neutral[1]}`,
    },

    '& .image': {
      height: 40,
      width: 40,
      background: theme.colors.primary[0],
    },

    '& .text': {
      fontWeight: 600,
    },

    '&.active, &:hover': {
      background: theme.colors.neutral[1],
    },
  },
}));
