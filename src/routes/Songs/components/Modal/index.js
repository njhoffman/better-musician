import { connect } from 'react-redux';
import ModalBase from './ModalBase';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  modal: state.modal
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBase);
