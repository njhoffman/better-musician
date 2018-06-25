import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import ActionExitToApp from 'material-ui-icons/ExitToApp';
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
    icon: ActionExitToApp
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
    let disabled = false;
    let loading = false;

    return (
      <Button
        loading={loading}
        primary
        icon={this.props.icon}
        className={this.props.className + ' oauth-sign-in-submit'}
        disabled={disabled}
        onClick={() => this.handleClick()}
        {...this.props} />
    );
  }
}

export default connect(({ auth }) => ({ auth }))(OAuthSignInButton);
