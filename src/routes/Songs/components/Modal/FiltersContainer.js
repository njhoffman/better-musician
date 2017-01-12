import { connect } from 'react-redux';
import FiltersModal from './Filters';

export const hideModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "HIDE_MODAL" });
  };
}
const mapDispatchToProps = {
  hideModal
};

const mapStateToProps = (state) => ({
  modal: state.modal
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);
