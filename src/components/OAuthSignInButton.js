import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ExitToApp } from '@material-ui/icons';
import Button from './Button';
// import { oAuthSignIn as _oAuthSignIn } from 'redux-auth';

// hook for rewire
// var oAuthSignIn = _oAuthSignIn;

class OAuthSignInButton extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    provider: PropTypes.string.isRequired,
    signInParams: PropTypes.object,
    icon: PropTypes.object,
    endpoint: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    next: PropTypes.func,
    className: PropTypes.string
  };

  static defaultProps = {
    signInParams: {},
    label: 'OAuth Sign In',
    icon: ExitToApp
  };

  getEndpoint() {
    return (this.props.endpoint || false);
  }

  handleClick() {
    // this.props.dispatch(oAuthSignIn({
    //   provider: this.props.provider,
    //   params: this.props.signInParams,
    //   endpointKey: this.getEndpoint()
    // }))
    //   .then(this.props.next)
    //   .catch(() => {});
  }

  render() {
    const disabled = false;
    const loading = false;

    return (
      <Button
        loading={loading}
        primary
        icon={this.props.icon}
        className={`${this.props.className} oauth-sign-in-submit`}
        disabled={disabled}
        onClick={() => this.handleClick()}
        {...this.props}
      />
    );
  }
}

export default connect(({ auth }) => ({ auth }))(OAuthSignInButton);
