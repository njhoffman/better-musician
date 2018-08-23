import _ from 'lodash';
import { ORM, createReducer } from 'redux-orm';
import models from './models';
import { init as initLog } from 'shared/logger';
const { info } = initLog('orm');

let orm;

if (!orm) {
  // don't register again if hot loaded
  info('Registering new orm');
  orm = new ORM();
  // clone to get around redefinining property error
  // https://github.com/tommikaikkonen/redux-orm/issues/156
  // TODO: make this work as a singleton!
  const clonedModels = _.clone(models);
  orm.register(...clonedModels);
}

// for users and songs selectors selector
export { orm };
export default createReducer(orm);
