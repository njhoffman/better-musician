import { connect } from 'react-redux';
import { getCurrentSong } from 'routes/Songs/modules/songs';

import Footer from './Footer';

const mapStateToProps = (state) => ({
  song: getCurrentSong(state),
});

const mapActionCreators  = {};

export default connect(mapStateToProps /*, mapActionCreators */)(Footer);
