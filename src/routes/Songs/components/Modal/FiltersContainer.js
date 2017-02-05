import { connect } from 'react-redux';
import FiltersModal from './Filters';
import { uiHideModal } from 'store/ui';

const mapDispatchToProps = {
  uiHideModal
};

const mapStateToProps = (state) => ({
  modal:         state.ui.modal,
  isOpen:        state.ui.modal.type === 'MODAL_FILTER_SONGS'
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);
