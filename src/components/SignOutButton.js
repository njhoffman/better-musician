import React  from 'react';
import PropTypes from 'prop-types';
import ActionLock from '@material-ui/icons/Lock';
import { connect } from 'react-redux';
import { signOut } from 'actions/auth/signout';
import Button from './Button';

const getEndpoint = ({ endpoint, config }) => (
  endpoint || config.auth.currentEndpointKey || config.auth.defaultEndpointkey
);

const handleClick = (e, { next, dispatch }) => {
  dispatch(signOut(getEndpoint()))
    .then(next)
    .catch(() => {});
};


const SignOutButton = ({
  next,
  endpoint,
  dispatch,
  config,
  isFetching,
  isSignedIn,
  syncErrors,
  ...props
}) => (
  <Button
    icon={ActionLock}
    disabled={Boolean(isSignedIn || syncErrors || isFetching)}
    loading={isFetching}
    label='Sign Out'
    primary
    className='sign-out-submit'
    onClick={(e) => handleClick(e, { next, dispatch })}
    {...props}
  />
);

SignOutButton.defaultProps = {
  endpoint:  null,
  next: () => {},
  syncErrors: null
};


SignOutButton.propTypes = {
  next:     PropTypes.func,
  endpoint: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  config:   PropTypes.instanceOf(Object).isRequired,
  syncErrors:   PropTypes.instanceOf(Object),
  isFetching:  PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  config:      state.config,
  isSignedIn:  state.user.isSignedIn,
  errors:      state.api.auth.login.errors || [],
  syncErrors:  state.form.login && state.form.login.syncErrors,
  isFetching:  state.api.auth.login.loading,
  signOut
});

export default connect(mapStateToProps)(SignOutButton);
