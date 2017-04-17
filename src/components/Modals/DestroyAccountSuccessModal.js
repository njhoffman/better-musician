import React, { PropTypes } from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import { hideDestroyAccountSuccessModal } from 'redux-auth';

class DestroyAccountSuccessModal extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {
    return (
      <Modal
        {...this.props}
        title='Destroy Account Success'
        containerClass='destroy-account-success-modal'
        closeAction={hideDestroyAccountSuccessModal}>
        <p>{this.props.auth.getIn(['ui', 'destroyAccountMessage'])}</p>
      </Modal>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(DestroyAccountSuccessModal);
