import { connect } from 'react-redux';

import SongsView from '../components/SongsView';

export const showAddSongModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "SHOW_MODAL", modalType: "ADD_SONG", modalProps: {} });
  };
};


const mapActionCreators = { showAddSongModal };
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapActionCreators)(SongsView);
