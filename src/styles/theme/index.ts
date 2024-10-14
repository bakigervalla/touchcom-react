import { MantineThemeOverride } from '@mantine/core';

import colors from './colors';
import components from './components';
import fontSizes from './fontSizes';
import globalStyles from './globalStyles';
import headings from './headings';

const theme: MantineThemeOverride = {
  globalStyles,
  colorScheme: 'light',
  colors,
  primaryColor: 'primary',
  defaultRadius: 4,
  fontFamily: 'OpenSauceSansLight',
  fontSizes,
  headings,
  components,
};

export default { theme };
