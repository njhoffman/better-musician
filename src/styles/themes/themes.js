import _ from 'lodash';
import defaultThemes from 'styles/themes/defaults';
import { createMuiTheme } from '@material-ui/core/styles';
import { init as initLog } from 'shared/logger';

const { info } = initLog('themes');

const processTheme = (base, variation) => createMuiTheme(
  _.merge(Object.assign({}, base), Object.assign({}, variation))
);

// theme structure: themeName.variation:props
// variation is ligth dark or default, each theme has app property that holds custom values
const processThemes = ({ defaults = {}, ...themes }) => {
  const defaultTheme = {
    base: _.defaultsDeep(defaults.defaults, defaultThemes.defaults),
  };
  defaultTheme.light = _.defaultsDeep(defaults.light, defaultThemes.light, defaultTheme.base);
  defaultTheme.dark = _.defaultsDeep(defaults.dark, defaultThemes.dark, defaultTheme.base);

  const toProcess = {
    default: {
      base: processTheme(defaultTheme.base),
      light: processTheme(defaultTheme.light),
      dark: processTheme(defaultTheme.dark)
    }
  };

  // create base theme and variations from config
  _.each(themes, (theme, key) => {
    info(`Processing theme ${key}`);
    const baseTheme = _.defaultsDeep(theme.base, defaultTheme.base);
    toProcess[key] = {
      base: processTheme(baseTheme),
      light: processTheme(baseTheme, theme.light),
      dark: processTheme(baseTheme, theme.dark)
    };
  });

  // assign empty 'app' properties from initialized palette values by appMap reference
  const processed = {};
  _.each(toProcess, (theme, key) => {
    processed[key] = theme;
    _.each(theme, (variation, vKey) => {
      const appVar =  _.defaultsDeep(
        variation.app,
        _.mapValues(variation.appMap, appVal => (
          _.get(variation.palette, appVal)
        ))
      );
      processed[key][vKey].app = appVar;
      delete processed[key][vKey].appMap;
    });
  });

  return processed;
};

export default processThemes;
