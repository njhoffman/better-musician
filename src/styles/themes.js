import _ from 'lodash';
import { createMuiTheme } from 'material-ui/styles';

import { init as initLog } from 'shared/logger';
const { debug, info } = initLog('themes');

const instrumentalDefaults = {
  'headerLinksColor' : 'text.primary',
  'footerFiller'     : 'background.default',
  'fieldsViewLabel'  : 'secondary.main',
  'headerBackground' : 'background.default'
};

const themeDefaults = {
  // 'drawerBackground' : 'backgroundColor'
};

const processTheme = (themeName = 'steelBlue-dark') => {
  info(`Processing theme: ${themeName}`);
  const theme = createMuiTheme(require(`themes/${themeName}`).default);

  // _.defaults(theme, _.mapValues(themeDefaults, tVal => theme[tVal]));
  _.defaults(theme.instrumental, _.mapValues(instrumentalDefaults, mVal => _.get(theme.palette, mVal)));
  // theme.instrumental.headerLinksColor = theme.instrumental.headerLinksColor || theme.palette.secondaryTextColor;
  // theme.instrumental.footerFiller = theme.instrumental.footerFiller || theme.palette.canvasColor;
  // theme.instrumental.fieldsViewLabel = theme.instrumental.fieldsViewLabel || theme.palette.accent1Color;
  return theme;
};
export default processTheme;
