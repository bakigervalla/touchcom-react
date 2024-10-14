import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  reviewContainer: { flexDirection: 'column', gap: 32 },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 16,
    paddingBottom: 28,

    '& .icon': { color: theme.colors.primary[5] },

    '& .mantine-Accordion-chevron': {
      '&[data-rotate]': {
        content: "'-'",
        transform: 'rotate(45deg)',
      },
    },
  },
}));
