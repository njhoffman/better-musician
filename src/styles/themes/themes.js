import _ from 'lodash';
import defaultThemes from 'styles/themes/defaults';
import { createMuiTheme } from '@material-ui/core/styles';
import { init as initLog } from 'shared/logger';

const { info } = initLog('themes');

const processTheme = (base, variation) => createMuiTheme(
  _.merge(Object.assign({}, base), Object.assign({}, variation))
);

const processThemes = ({ defaults = {}, ...themes }) => {
  const defaultTheme = {
    base: _.defaultsDeep(defaults.defaults, defaultThemes.defaults),
  };
  defaultTheme.light = _.defaultsDeep(defaults.light, defaultThemes.light, defaultTheme.base);
  defaultTheme.dark = _.defaultsDeep(defaults.dark, defaultThemes.dark, defaultTheme.base);

  const processed = {
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
    processed[key] = {
      base: processTheme(baseTheme),
      light: processTheme(baseTheme, theme.light),
      dark: processTheme(baseTheme, theme.dark)
    };
  });

  // assign empty 'theme.app' properties from initialized palette values
  // pointed to  by 'appMap' property values
  _.each(processed, (theme, key) => {
    _.each(theme, (variation) => {
      variation.app = _.defaultsDeep(
        variation.app,
        _.mapValues(variation.appMap, mVal => _.get(processed.palette, mVal))
      );
      delete variation.appMap;
    });
  });

  return processed;
};

export default processThemes;
