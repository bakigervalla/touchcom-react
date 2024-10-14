import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  configurationForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    '& .mantine-RadioGroup-label': { fontWeight: 600 },
    '& .mantine-Text-root': {
      fontWeight: 600,
      fontSize: '0.75rem',
      marginTop: '0.23rem',
    },
    '&.mantine-Select-root, .mantine-RadioGroup-root, .mantine-InputWrapper-root, .mantine-Slider-root':
      { width: '100%' },
  },
  inputContainer: { width: '100%', gap: 20, alignItems: 'center' },
}));
