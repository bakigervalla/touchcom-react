import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  container: {
    alignItems: 'center',
    gap: 8,
    '& .mantine-Slider-label': {
      display: 'none',
    },
  },
  inputBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
    border: `1px solid ${theme.colors.neutral[2]}`,
    borderRadius: 4,
    color: theme.colors.neutral[8],
    height: 37,
    width: 64,
  },
}));
