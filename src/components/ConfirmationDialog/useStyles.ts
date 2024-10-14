import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  confirmationDialog: {
    '& .mantine-Modal-header': {
      background: theme.white,
      borderBottom: `1px solid ${theme.colors.neutral[2]}`,

      '& .mantine-ActionIcon-root': {
        background: theme.colors.neutral[0],
      },
    },
  },
  contentContainer: {
    alignItems: 'center',
    textAlign: 'center',
    gap: 20,
    padding: '18px 0 36px 0',
  },
  confirmationDialogText: {
    color: theme.colors.neutral[5],
  },
  buttonsContainer: {
    gap: 12,

    '& .button': {
      height: 'auto',
      width: '100%',
    },
  },
}));
