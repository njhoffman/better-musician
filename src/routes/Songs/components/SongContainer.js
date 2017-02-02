import { connect } from 'react-redux';
import { maxDifficulty as maxDifficultySelector} from 'selectors/users';
import Song from './Song';
import {
  uiShowModal,
  MODAL_ADD_SONG
} from 'store/ui';

export const showViewSongModal = () => uiShowModal(MODAL_ADD_SONG, 'view');

const mapStateToProps = (state, action) => ({
  maxDifficulty:   maxDifficultySelector(state)
});

const mapActionCreators = ({
  showViewSongModal
});

export default connect(
    mapStateToProps,
    mapActionCreators
)(Song);

