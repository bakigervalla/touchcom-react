import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  inviteAdminForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: 432,
    '& .mantine-Text-root': { fontWeight: 600, minWidth: '40%' },
    '& .mantine-Checkbox-label': { fontSize: 13 },
  },
  infoBox: {
    height: 'max-content',
    boxShadow: 'unset',
    border: 'none',
    background: theme.colors.neutral[0],
    padding: '10px 0 10px 22px',
    width: '100%',
    '&:before': { background: theme.colors.warning[4] },
    '& .mantine-Text-root': {
      fontSize: 12,
      color: `${theme.colors.neutral[8]} !important`,
    },
  },
  buttonsContainer: {
    gap: 10,
    padding: '10px 0',
    alignItems: 'center',
  },
  submitButton: { height: 40 },
}));
