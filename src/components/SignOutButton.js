import React  from 'react';
import PropTypes from 'prop-types';
import { Lock as ActionLock } from '@material-ui/icons/Lock';
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
  user,
  ...props
}) => (
  <Button
    icon={ActionLock}
    disabled={!user.isSignedIn}
    label='Sign Out'
    primary
    className='sign-out-submit'
    onClick={(e) => handleClick(e, { next, dispatch })}
    {...props}
  />
);

SignOutButton.defaultProps = {
  endpoint:  null,
  next: () => {}
};


SignOutButton.propTypes = {
  next:     PropTypes.func,
  endpoint: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  config:   PropTypes.instanceOf(Object).isRequired,
  user:     PropTypes.instanceOf(Object).isRequired
};

export default connect(({ config, user }) => ({ config, user }))(SignOutButton);
