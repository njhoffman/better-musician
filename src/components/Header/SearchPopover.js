import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MdSearch as SearchIcon,
  MdClose as ResetIcon
} from 'react-icons/md';
import { setSearchFilter } from 'routes/Songs/modules/reducer';
import {
  Paper,
  Popper,
  Fade,
  MenuItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  IconButton,
  TextField,
  withStyles
} from '@material-ui/core';

const styles = (theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    textDecoration: 'none',
    minWidth: '0px',
    padding: '0',
    color: theme.app.headerLinksColor,
    '&:hover': {
      color: theme.palette.text.primary
    }
  },
  icon: {
    color: 'inherit'
  },
  iconTextWrapper: {
    flex: 'none',
    padding: '0',
    color: 'inherit'
  },
  iconText: {
    color: 'inherit'
  },
  paper: {
    paddingTop: '0',
    paddingBottom: '0'
  },
  searchBox: {
    height: '3.0em'
  },
  closeButton: {
    padding: 0
  }
});

const isSearchOpen = (isOpen, searchText) => (
  Boolean(isOpen || searchText.length > 0)
);

let textRef;
const initTextRef = (node) => {
  if (node) {
    textRef = node;
    textRef.focus();
  }
};

const SearchPopover = ({
  classes, isOpen, anchor, open, close,
  setSearch, searchText,
  ...props
}) => (
  <Fragment>
    <MenuItem
      className={classes.link}
      selected={isSearchOpen(isOpen, searchText)}
      onClick={(e) => {
        if (isSearchOpen(isOpen, searchText)) {
          setSearch('');
          close('search');
        } else {
          open('search', e);
        }
      }}>
      <ListItemIcon classes={{ root: classes.icon }}>
        <SearchIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText
        className={classes.iconTextWrapper}
        primaryTypographyProps={{ className: classes.iconText }}>
        Search
      </ListItemText>
    </MenuItem>
    <Popper
      open={isSearchOpen(isOpen, searchText)}
      anchorEl={anchor}
      transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <TextField
              autoFocus
              onChange={(e) => setSearch(e.currentTarget.value)}
              name='searchFilter'
              variant='outlined'
              className={classes.searchBox}
              value={searchText}
              placeholder='Search ...'
              inputRef={initTextRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      className={classes.closeButton}
                      aria-label='Toggle password visibility'
                      disabled={searchText.length === 0}
                      onClick={(e) => {
                        setSearch('');
                        textRef.focus();
                      }}>
                      <ResetIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
  </Fragment>
);

SearchPopover.defaultProps = {
  anchor: null
};

SearchPopover.propTypes = {
  classes:     PropTypes.instanceOf(Object).isRequired,
  isOpen:      PropTypes.bool.isRequired,
  anchor:      PropTypes.instanceOf(HTMLElement),
  open:        PropTypes.func.isRequired,
  toggle:      PropTypes.func.isRequired,
  searchText:  PropTypes.string.isRequired
};

const mapActionCreators = {
  setSearch: setSearchFilter,
};

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SearchPopover));
