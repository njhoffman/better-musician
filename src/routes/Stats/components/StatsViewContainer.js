import { connect } from 'react-redux';
import StatsView from './StatsView';
import { updateUser } from 'store/api';

const mapActionCreators = { };

const mapStateToProps = (state) => {
  return ({ });
}

export default connect(mapStateToProps, mapActionCreators)(StatsView);
