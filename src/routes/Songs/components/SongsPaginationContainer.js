import { connect } from 'react-redux';
import { getVisibleSongs, setCurrentSong, setSort, viewSong } from 'routes/Songs/modules/songs';
import {
  paginationTotal as paginationTotalSelector,
  paginationStart as paginationStartSelector,
  paginationPages as paginationPagesSelector,
  paginationEnd as paginationEndSelector
} from 'routes/Songs/modules/selectors';

import SongsPagination from './SongsPagination';


const setPaginationCurrent = (e, val) => (dispatch) => {
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: val });
};

const setPaginationPerPage = (e, val) => (dispatch) => {
  dispatch({ type: 'SET_PAGINATION_PER_PAGE', payload: val });
};

const setPaginationIncrement = () => (dispatch, getState) => {
  const curr = parseInt(getState().songsView.paginationCurrent);
  const val = curr + 1 > paginationEndSelector(getState())
    ? paginationEndSelector(getState())
    : curr + 1;
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: val });
};

const setPaginationDecrement = () => (dispatch, getState) => {
  const curr = parseInt(getState().songsView.paginationCurrent);
  const val = curr - 1 <= 1 ? 1 : curr - 1;
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: val });
};

const setPaginationStart = () => (dispatch, getState) => {
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: 1 });
};

const setPaginationEnd = () => (dispatch, getState) => {
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: paginationEndSelector(getState()) });
};


const mapStateToProps = (state, action) => ({
  paginationCurrent: state.songsView.paginationCurrent,
  paginationPerPage: state.songsView.paginationPerPage,
  paginationTotal:   paginationTotalSelector(state),
  paginationPages:   paginationPagesSelector(state),
  paginationStart:   paginationStartSelector(state),
  paginationEnd:     paginationEndSelector(state)
});

const mapActionCreators = ({
  setPaginationCurrent,
  setPaginationPerPage,
  setPaginationIncrement,
  setPaginationDecrement,
  setPaginationStart,
  setPaginationEnd
});

export default connect(
    mapStateToProps,
    mapActionCreators
)(SongsPagination);

