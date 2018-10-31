import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { oAuthSignIn } from 'actions/auth/signin';
import Button from './Button';

const handleClick = (e, { next, dispatch, provider, signInParams }) => (
  dispatch(oAuthSignIn({
    provider,
    params: signInParams,
    endpointKey: this.getEndpoint()
  }))
    .then(next)
    .catch(() => {})
);

const OAuthSignInButton = ({
  provider,
  isFetching,
  signInParams,
  syncErrors,
  icon,
  isSignedIn,
  endpoint,
  dispatch,
  next,
  className,
  label,
  ...props
}) => (
  <Button
    loading={isFetching}
    primary
    icon={icon}
    className={`${className} oauth-sign-in-submit`}
    disabled={Boolean(isSignedIn || syncErrors || isFetching)}
    onClick={(e) => handleClick(e, { next, dispatch, provider, signInParams })}
    {...props}
  />
);

OAuthSignInButton.propTypes = {
  auth:         PropTypes.instanceOf(Object).isRequired,
  provider:     PropTypes.string.isRequired,
  signInParams: PropTypes.instanceOf(Object),
  icon:         PropTypes.instanceOf(Object),
  endpoint:     PropTypes.string.isRequired,
  dispatch:     PropTypes.func.isRequired,
  next:         PropTypes.func,
  className:    PropTypes.string,
  label:        PropTypes.string
};

OAuthSignInButton.defaultProps = {
  className: '',
  next: (() => {}),
  signInParams: {},
  label: 'OAuth Sign In',
  icon: ExitToAppIcon
};

const mapStateToProps = (state) => ({
  config:      state.config,
  isSignedIn:  state.user.isSignedIn,
  errors:      state.api.auth.login.errors || [],
  syncErrors:  state.form.login && state.form.login.syncErrors,
  isFetching:  state.api.auth.login.loading
});

export default connect(mapStateToProps)(OAuthSignInButton);
