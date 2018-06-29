import { connect } from 'react-redux';
import { uiToggleDrawerMenu } from 'actions/ui';
import HeaderLeft from './HeaderLeft';

const mapActionCreators = {
  toggleDrawerMenu : uiToggleDrawerMenu
};

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps, mapActionCreators)(HeaderLeft);
