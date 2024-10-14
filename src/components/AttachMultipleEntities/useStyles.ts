import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  attachMultipleEntitiesContainer: {
    gap: 12,
    height: 400,
    flexDirection: 'column',
  },
  selectionContainer: {
    gap: 10,
    height: '100%',
    width: '100%',
    flexWrap: 'wrap',
    overflow: 'auto',
    alignContent: 'flex-start',
    flexGrow: 1,
    borderRadius: 10,
    padding: '12px 18px',
    backgroundColor: theme.colors.neutral[0],

    '& > div:nth-of-type(1)': {
      width: '25%',
    },
  },
  selectedItem: {
    fontWeight: 600,
    color: theme.colors.info[5],
  },
  buttonsContainer: {
    gap: 12,
    marginTop: 'auto',

    '& .button': {
      height: 'auto',
      width: '100%',
    },
  },
  notFoundIcon: { height: '3rem !important', width: '3rem !important' },
  notFoundContainer: { gap: 5, padding: 10, width: '100% !important' },
  notFoundLabel: { fontSize: 13 },
  notFoundDescription: { fontSize: 10 },
}));
