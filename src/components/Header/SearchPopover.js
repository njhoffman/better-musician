import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdSearch as SearchIcon } from 'react-icons/md';
import {
  Paper,
  Popper,
  Fade,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  withStyles
} from '@material-ui/core';

const styles = {
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    textDecoration: 'none',
    minWidth: '0px',
    padding: '0'
  },
  icon: { },
  iconText: {
    flex: 'none',
    padding: 0
  },
  paper: {
    paddingTop: '0',
    paddingBottom: '0'
  },
  searchBox: {
    height: '3.0em'
  }
};

const SearchPopover = ({
  classes, isOpen, anchor,
  open, close, toggle, closeAll,
  ...props
}) => (
  <MenuItem
    className={classes.link}
    selected={Boolean(isOpen)}
    onClick={(e) => toggle('search', e)}>
    <ListItemIcon>
      <SearchIcon className={classes.icon} />
    </ListItemIcon>
    <ListItemText className={classes.iconText}>Search</ListItemText>
    <Popper
      open={Boolean(isOpen)}
      anchorEl={anchor}
      transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <TextField
              autoFocus
              variant='outlined'
              className={classes.searchBox}
              placeholder='Search ...'
            />
          </Paper>
        </Fade>
      )}
    </Popper>
  </MenuItem>
);

SearchPopover.defaultProps = {
  anchor: null
};

SearchPopover.propTypes = {
  classes:     PropTypes.instanceOf(Object).isRequired,
  isOpen:      PropTypes.bool.isRequired,
  anchor:      PropTypes.instanceOf(HTMLElement),
  open:        PropTypes.func.isRequired,
  close:       PropTypes.func.isRequired,
  toggle:      PropTypes.func.isRequired,
  closeAll:    PropTypes.func.isRequired
};

const mapActionCreators = {};

const mapStateToProps = () => ({ });

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SearchPopover));
