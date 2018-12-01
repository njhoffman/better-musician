import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { oAuthSignIn } from 'actions/auth/signin';
import Button from './Button';

const getEndpoint = ({ endpoint, config }) => (
  endpoint || config.auth.currentEndpointKey || config.auth.defaultEndpointkey
);

const handleClick = (e, { next, dispatch, provider, signInParams }) => (
  dispatch(oAuthSignIn({
    provider,
    params: signInParams,
    endpointKey: getEndpoint()
  }))
    .then(next)
    .catch(() => {})
);

const OAuthSignInButton = ({
  provider,
  disabled,
  isFetching,
  signInParams,
  syncErrors,
  isSignedIn,
  endpoint,
  dispatch,
  next,
  className,
  ...props
}) => (
  <Button
    loading={isFetching}
    primary
    className={`${className} oauth-sign-in-submit`}
    disabled={disabled || Boolean(isSignedIn)}
    onClick={(e) => handleClick(e, { next, dispatch, provider, signInParams })}
    {...props}
  />
);

OAuthSignInButton.defaultProps = {
  className: '',
  next: (() => {}),
  signInParams: {},
  disabled: false,
  endpoint:  null,
  icon: ExitToAppIcon
};

OAuthSignInButton.propTypes = {
  provider:     PropTypes.string.isRequired,
  signInParams: PropTypes.instanceOf(Object),
  config:       PropTypes.instanceOf(Object).isRequired,
  icon:         PropTypes.instanceOf(Object),
  disabled:     PropTypes.bool,
  endpoint:     PropTypes.string,
  dispatch:     PropTypes.func.isRequired,
  next:         PropTypes.func,
  className:    PropTypes.string
};

const mapStateToProps = (state) => ({
  config:      _.get(state, 'config'),
  isSignedIn:  _.get(state, 'user.isSignedIn'),
  errors:      _.get(state, 'api.auth.login.errors'),
  syncErrors:  _.get(state, 'form.login.syncErrors'),
  isFetching:  _.get(state, 'api.auth.login.loading')
});

export default connect(mapStateToProps)(OAuthSignInButton);
