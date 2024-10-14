import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  administratorsPageLayout: {
    overflow: 'auto',
    flexDirection: 'row',
    padding: 'unset',
  },
  adminsContainer: {
    gap: 28,
    width: '65%',
    padding: '28px 32px',
    flexDirection: 'column',
  },
  infoContainer: {
    gap: 28,
    width: '35%',
    padding: '28px 32px',
    flexDirection: 'column',
  },
}));
