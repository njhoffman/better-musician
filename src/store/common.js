import _ from 'lodash';
import {
  authenticatedSets,
  notAuthenticatedSets,
  commonSets,
  viewSets
} from 'store/actionSets';

export const commonInitView = (action) => {
  const { payload: routeName, meta: { isAuthenticated } } = action;
  return {
    authenticatedView:  isAuthenticated,
    initialized : true,
    viewActionSets   : _.get(viewSets, `${routeName}ViewSets`),
    commonActionSets : _.merge(commonSets, (isAuthenticated ? authenticatedSets : notAuthenticatedSets))
  };
};

export { commonInitView as default };
