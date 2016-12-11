import { connect } from 'react-redux';
import ModalBase from '../../components/Modal';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  modal: state.modal
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBase);
