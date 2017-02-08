import React from 'react';
import { hideEmailSignUpSuccessModal } from 'store/auth/actions/ui';
import { connect } from 'react-redux';
import Modal from './Modal';

class EmailSignUpSuccessModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        containerClass='email-sign-up-success-modal'
        closeAction={hideEmailSignUpSuccessModal}
        title='Sign Up Success'>
        <p>Thank you for signing up for instrumental.io!</p>
        <p>We generated a couple of sample songs to help familiarize you with the interface.</p>
        <p>Double click a song to view/edit it, or add your own song by using the menu at the top.</p>
      </Modal>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(EmailSignUpSuccessModal);
