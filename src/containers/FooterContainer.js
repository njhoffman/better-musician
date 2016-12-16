import { connect } from 'react-redux';
import { getCurrentSong } from 'routes/Songs/modules/songs';

import Footer from 'components/Footer';

const mapStateToProps = (state) => ({
  song: getCurrentSong(state.songs),
});

const mapActionCreators  = {};

export default connect(mapStateToProps /*, mapActionCreators */)(Footer);
