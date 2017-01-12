import { connect } from 'react-redux';
import AddSongModal from './AddSong';
import { addSong, isOpen, hideModal } from '../../modules/songs';

const mapDispatchToProps = {
  hideModal,
  addSong
};

const mapStateToProps = (state) => ({
  genres:      state.songs && state.songs.genres,
  instruments: state.songs && state.songs.instruments,
  modal:       state.modal,
  isOpen:      isOpen(state.modal)

});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongModal);
