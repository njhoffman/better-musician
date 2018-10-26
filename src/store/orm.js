import _ from 'lodash';
import { ORM, createReducer } from 'redux-orm';
import { init as initLog } from 'shared/logger';
import models from './models';

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
