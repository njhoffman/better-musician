import { ORM, createReducer } from 'redux-orm';
import models from './models';
import { init as initLog } from 'shared/logger';
const { info } = initLog('orm');

let orm;
if (!orm) {
  // don't register again if hot loaded
  orm = new ORM();
  orm.register(...models);
}

// for users and songs selectors selector
export { orm };

export default createReducer(orm);
