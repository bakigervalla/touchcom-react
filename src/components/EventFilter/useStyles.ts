import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  filterContainer: {
    gap: 8,
    '& .active': {
      '& .mantine-Chip-label': {
        border: `1px solid  ${theme.colors.secondary[6]}`,
        backgroundColor: `${theme.colors.secondary[0]}33`,
      },
    },
    '& .mantine-Chip-label': {
      padding: '8px 10px',
      backgroundColor: theme.colors.neutral[0],
      border: `1px solid  ${theme.colors.neutral[2]}`,
      '& div:first-of-type': {
        gap: 8,
      },
      '&:hover': {
        border: `1px solid ${theme.colors.secondary[6]}`,
        backgroundColor: `${theme.colors.secondary[0]}33`,
      },
    },
    '& .mantine-Badge-root': {
      backgroundColor: theme.colors.neutral[2],
      color: theme.colors.neutral[8],
    },
  },
}));
