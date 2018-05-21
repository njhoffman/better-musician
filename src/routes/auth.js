import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import AuthLoading from 'components/AuthLoading';

const locationHelper = locationHelperBuilder({});

// is authenticated

const userIsAuthDefaults = {
  authenticatedSelector: state => state.auth.getIn(['user', 'isSignedIn']),
  authenticatingSelector: state => state.user.isLoading,
  wrapperDisplayName: 'UserIsAuth'
};

export const userIsAuth = connectedAuthWrapper(userIsAuthDefaults);

export const userIsAuthRedir = connectedRouterRedirect({
  ...userIsAuthDefaults,
  AuthenticatingComponent: AuthLoading,
  redirectPath: '/login'
});

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.data !== null && state.user.data.isAdmin,
  predicate: user => user.isAdmin,
  wrapperDisplayName: 'UserIsAdmin'
});

// not authenticated

const userNotAuthDefaults = {
  // Want to redirect the user when they are done loading and auth
  // authSelector: state => state.user.data === null && state.user.isLoading === false,
  authenticatedSelector: state => !state.auth.getIn(['user', 'isSignedIn']),
  wrapperDisplayName: 'UserNotAuth'
};

export const userNotAuth = connectedAuthWrapper(userNotAuthDefaults);

export const userNotAuthRedir = connectedRouterRedirect({
  ...userNotAuthDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
  allowRedirectBack: false
});

export const userNoAuthenticationDefaults = {
  authenticatedSelector: state => true,
  wrapperDisplayName: 'UserNoAuthentication'
};

export const userNoAuthentication = connectedAuthWrapper(userNoAuthenticationDefaults);
