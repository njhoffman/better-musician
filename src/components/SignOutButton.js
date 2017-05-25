import React  from 'react';
import PropTypes from 'prop-types';
import ButtonLoader from './ButtonLoader';
import ActionLock from 'material-ui/svg-icons/action/lock';
import { connect } from 'react-redux';
import { signOut } from 'redux-auth';

export class SignOutButton extends React.Component {
  static propTypes = {
    next:     PropTypes.func.isRequired,
    endpoint: PropTypes.string,
    icon:     PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    auth:     PropTypes.object.isRequired
  };

  static defaultProps = {
    next: () => {},
    children: <span>Sign Out</span>,
    icon: ActionLock
  };

  getEndpoint() {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(['configure', 'currentEndpointKey']) ||
      this.props.auth.getIn(['configure', 'defaultEndpointKey'])
    );
  }

  handleClick() {
    this.props.dispatch(signOut(this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render() {
    let disabled = !this.props.auth.getIn(['user', 'isSignedIn']);
    return (
      <ButtonLoader
        loading={this.props.auth.getIn(['signOut', this.getEndpoint(), 'loading'])}
        icon={this.props.icon}
        disabled={disabled}
        primary
        className='sign-out-submit'
        onClick={() => this.handleClick()}
        {...this.props} />
    );
  }
}

export default connect(({ auth }) => ({ auth }))(SignOutButton);
