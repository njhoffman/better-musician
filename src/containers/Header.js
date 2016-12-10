import { connect } from 'react-redux';
// import { showModal } from '../store/modal';

import Header from '../components/Header';

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

// const showAddSongModal = () => showModal('ADD_SONG');

export const showAddSongModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "SHOW_MODAL", modalType: "ADD_SONG", modalProps: {} });
  };
};

export const showFiltersModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "SHOW_MODAL", modalType: "FILTER_SONGS", modalProps: {} });
  };
};

const mapDispatchToProps = {
  showAddSongModal,
  showFiltersModal
};

const mapStateToProps = (state) => ({
});

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Header);
