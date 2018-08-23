import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { withStyles, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';

const styles = {
  headerLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  iconWrapper: {
    width: '100%',
    justifyContent: 'center'
  },
  icon: { },
  iconText: {
    flex: 'none',
    padding: 0
  },
  paper: {
    paddingTop: '0',
    paddingBottom: '0'
  }
};

const SearchPopover = ({
  classes, isOpen, anchor, width,
  open, close, toggle, closeAll,
  ...props
}) => (
  <a className={classes.headerLink}>
    <MenuItem
      className={classes.iconWrapper}
      selected={Boolean(isOpen)}
      onMouseEnter={(e) => open('search', e)}>
      <ListItemIcon>
        <SearchIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText className={classes.iconText}>Search</ListItemText>
    </MenuItem>
  </a>
);

SearchPopover.propTypes = {
  classes:     PropTypes.object.isRequired,
  isOpen:      PropTypes.bool.isRequired,
  anchor:      PropTypes.object,
  width:       PropTypes.number,
  open:        PropTypes.func.isRequired,
  close:       PropTypes.func.isRequired,
  toggle:      PropTypes.func.isRequired,
  closeAll:    PropTypes.func.isRequired
};

const mapActionCreators = {};

const mapStateToProps = () => ({ });

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SearchPopover));
//
//   <Popover
//     open={{this.props.searchPopoverOpen}
//     anchorEl={{this.props.searchPopoverAnchor}
//     anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
//     targetOrigin={{ horizontal: 'left', vertical: 'top' }}
//     style={{ borderRadius: '5px', padding: '5px', width: '25%' }}
//     onClose={this.props.close}
//     zDepth=5}>
//     <TextField
//       style={{ width: '100%', height: '43px' }}
//       underlineShow={false}
//       floatingLabelStyle={{ top: '20px' }}
//       inputStyle={{ margin: '15px 0px 0px 0px', height: '25px', boxShadow: 'none' }}
//       floatingLabelText='Search ...'
//     />
//   </Popover>
