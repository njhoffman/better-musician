import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-foundation';
import { withStyles } from '@material-ui/core';

import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import {
  currentSong as currentSongSelector,
  songStats as songStatsSelector
} from 'routes/Songs/modules/selectors';

import StatsFooter from './StatsFooter';
import SongFooter from './SongFooter';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.app.canvasColor, // || theme.palette.background.default,
    display: 'flex',
  },
  stars: {
    color: `${theme.app.starColor}`
  },
  footer: {
    width: '100%',
    height: '75px'
  },
  footerSong: {
    width: '100%'
  },
  footerStats: {
    width: '100%',
    fontSize: '0.8em'
  },
  fieldWrapper : {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'table',
    height: '100%',
    // span {
    //   display: block;
    //   width: 100%;
    // }
  },
  field: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  artistPicture : {
    height: '75px',
    minWidth: '75px',
    display: 'inline-block'
  },
  instrumentPicture: {
    height: '75px',
    minWidth: '75px',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  artistName: {
    // fontSize: '0.7em',
    // display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  genreName: {
    // float:         'right',
    // fontVariant:  'small-caps',
    whiteSpace:   'nowrap',
    overflow:      'hidden',
    textOverflow: 'ellipsis',
    // display:       'inline-block',
  },
  songTitle: {
    // marginTop: '10px',
    // fontSize: '0.8em',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  leftColumn: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px'
    }
    // @media (max-width: 500px) {
    //   padding: 0px;
    // }
  },
  rightColumn: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px'
    }
  },

});

const BlankFooter = ({ classes }) => <Row className={classes.footer} />;

BlankFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

const Footer = ({ song, classes, currentView, isSignedIn, ...props }) => (
  <div className={classes.root}>
    { currentView === 'Songs' && song && song.artist && SongFooter({ song, classes, ...props }) }
    { currentView === 'Songs' && !song && StatsFooter({ classes, ...props }) }
    { !isSignedIn && BlankFooter({ classes, ...props }) }
  </div>
);

Footer.propTypes = {
  song:          PropTypes.object,
  isSignedIn:    PropTypes.bool.isRequired,
  classes:       PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  song:          currentSongSelector(state),
  isSignedIn:    state.user.isSignedIn,
  stats:         songStatsSelector(state),
  maxDifficulty: maxDifficultySelector(state),
  currentView:   state.ui.currentView
});

const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(Footer));
