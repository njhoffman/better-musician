import { connect } from 'react-redux';
// import { increment, doubleAsync } from '../modules/counter';

import HomeView from '../components/HomeView';

// const mapActionCreators = ({});
//
const mapStateToProps = (state) => ({
  songs: state.home && state.home.songs ? state.home.songs : []
});

export default connect(mapStateToProps)(HomeView);
