import { init as initLog } from 'shared/logger';
import { createMuiTheme } from '@material-ui/core/styles';
import _ from 'lodash';

const { info } = initLog('themes');
const themes = {
  'defaultTheme': require('./defaultTheme').default,
  'crimsonRed':   require('./crimsonRed').default,
  'steelBlue':    require('./steelBlue').default
};

const defaults = {
  'headerLinksColor' : 'text.primary',
  'footerFiller'     : 'background.default',
  'fieldsViewLabel'  : 'secondary.main',
  'headerBackground' : 'background.default'
};

const processed = {};
const processTheme = (key, theme, variation) => {
  const { defaultTheme } = themes;
  processed[key] =
    createMuiTheme(
      _.merge(
        Object.assign({}, defaultTheme),
        Object.assign({}, theme),
        Object.assign({}, variation)
      )
    );
  _.defaultsDeep(
    processed[key].instrumental,
    _.mapValues(defaults, mVal => _.get(processed[key].palette, mVal))
  );
};

Object.keys(themes).forEach((key) => {
  const theme = themes[key];
  info(`Processing theme: ${theme.themeName}`);
  const lightTheme = require(`themes/${key}/light`).default;
  const darkTheme = require(`themes/${key}/dark`).default;

  processTheme(`${key}-light`, theme, lightTheme);
  processTheme(`${key}-dark`, theme, darkTheme);
});

export default processed;
