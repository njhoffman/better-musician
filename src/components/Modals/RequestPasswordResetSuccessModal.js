import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { hidePasswordResetRequestSuccessModal } from 'store/auth/actions/ui';
import Modal from './Modal';

class RequestPasswordResetSuccessModal extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {
    return (
      <Modal
        {...this.props}
        containerClass='request-password-reset-success-modal'
        closeAction={hidePasswordResetRequestSuccessModal}
        title='Password Reset Request Success'>
        <p>{this.props.auth.getIn(['ui', 'requestPasswordResetSuccessMessage'])}</p>
      </Modal>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(RequestPasswordResetSuccessModal);
