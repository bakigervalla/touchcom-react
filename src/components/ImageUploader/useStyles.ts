import { MantineTheme, createStyles } from '@mantine/core';

export default createStyles((theme: MantineTheme) => ({
  imageUploaderContainer: { position: 'relative', height: 'max-content' },
  profileImage: {
    display: 'flex',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    background: theme.colors.primary[0],

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(10, 10, 10, 0.40)',
    },
  },
  uploadButton: { position: 'absolute', top: '38%', left: '10%' },
}));
