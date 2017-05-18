import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Row, Column } from 'react-foundation';
import { RaisedButton, TextField } from 'material-ui';
import {
  MdNavigateBefore as BeforeIcon,
  MdNavigateNext as NextIcon
} from 'react-icons/lib/md';
import {
  paginationTotal as paginationTotalSelector,
  paginationStart as paginationStartSelector,
  paginationPages as paginationPagesSelector,
  paginationEnd as paginationEndSelector
} from 'routes/Songs/modules/selectors';

import css from './SongsPagination.scss';

export const SongsPagination = ({
  paginationCurrent,
  paginationPerPage,
  paginationTotal,
  paginationStart,
  paginationPages,
  paginationEnd,
  setPaginationCurrent,
  setPaginationPerPage,
  setPaginationIncrement,
  setPaginationDecrement,
  setPaginationStart,
  setPaginationEnd,
  muiTheme
}) => (
  <Row className={css.paginationRow}>
    <Column small={3} >
      <div className={css.paginationText}>
        <span>
          <strong>{paginationStart}</strong> - <strong>{paginationEnd}</strong> of
          <strong>{paginationTotal}</strong> Songs
          </span>
      </div>
    </Column>
    <Column small={6} >
      <div className={css.buttonWrapper}>
        <RaisedButton
          style={{ minWidth: '50px', fontSize: '1.4em', margin: '0px 5px' }}
          secondary
          onTouchTap={setPaginationStart}
          icon={
            <span style={{ color: muiTheme.palette.textColor }}>
              <BeforeIcon />
              <BeforeIcon style={{ marginLeft: '-10px' }} />
            </span>
          }
        />
        <RaisedButton
          style={{ minWidth: '50px', fontSize: '1.4em', margin: '0px 5px' }}
          onTouchTap={setPaginationDecrement}
          secondary
          icon={<BeforeIcon />}
        />
        <TextField
          type='number'
          name='paginationCurrent'
          value={paginationCurrent}
          onChange={setPaginationCurrent}
          underlineShow={false}
          inputStyle={{ textAlign: 'center', boxShadow: 'none' }}
          style={{ width: '50px' }} />
        <span className={css.centerPageTotal}> / &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {paginationPages} </span>
        <RaisedButton
          style={{ minWidth: '50px', fontSize: '1.4em', margin: '0px 5px' }}
          secondary
          onTouchTap={setPaginationIncrement}
          icon={<NextIcon />}
        />
        <RaisedButton
          style={{ minWidth: '50px', fontSize: '1.4em', margin: '0px 5px' }}
          secondary
          onTouchTap={setPaginationEnd}
          icon={
            <span style={{ color: muiTheme.palette.textColor }}>
              <NextIcon /><NextIcon style={{ marginLeft: '-10px' }} />
            </span>
          }
        />
      </div>
    </Column>
    <Column small={3}>
      <div className={css.buttonWrapper}>
        <TextField
          type='number'
          name='paginationPage'
          defaultValue={paginationPerPage}
          onChange={setPaginationPerPage}
          underlineShow={false}
          inputStyle={{ textAlign: 'center', boxShadow: 'none' }}
          style={{ width: '50px' }} />
        <span>Per Page</span>
      </div>
    </Column>
  </Row>
);

SongsPagination.propTypes = {
  paginationCurrent:      PropTypes.number,
  paginationPerPage:      PropTypes.number,
  paginationTotal:        PropTypes.number,
  paginationStart:        PropTypes.number,
  paginationPages:        PropTypes.number,
  paginationEnd:          PropTypes.number,
  setPaginationCurrent:   PropTypes.func,
  setPaginationPerPage:   PropTypes.func,
  setPaginationIncrement: PropTypes.func,
  setPaginationDecrement: PropTypes.func,
  setPaginationStart:     PropTypes.func,
  setPaginationEnd:       PropTypes.func,
  muiTheme:               PropTypes.object.isRequired
};

const setPaginationCurrent = (e, val) => (dispatch) => {
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: val });
};

const setPaginationPerPage = (e, val) => (dispatch) => {
  dispatch({ type: 'SET_PAGINATION_PER_PAGE', payload: val });
};

const setPaginationIncrement = () => (dispatch, getState) => {
  const curr = parseInt(getState().songsView.paginationCurrent);
  const val = curr + 1 > paginationEndSelector(getState())
    ? paginationEndSelector(getState())
    : curr + 1;
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: val });
};

const setPaginationDecrement = () => (dispatch, getState) => {
  const curr = parseInt(getState().songsView.paginationCurrent);
  const val = curr - 1 <= 1 ? 1 : curr - 1;
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: val });
};

const setPaginationStart = () => (dispatch, getState) => {
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: 1 });
};

const setPaginationEnd = () => (dispatch, getState) => {
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: paginationEndSelector(getState()) });
};

const mapStateToProps = (state, action) => ({
  paginationCurrent: state.songsView.paginationCurrent,
  paginationPerPage: state.songsView.paginationPerPage,
  paginationTotal:   paginationTotalSelector(state),
  paginationPages:   paginationPagesSelector(state),
  paginationStart:   paginationStartSelector(state),
  paginationEnd:     paginationEndSelector(state)
});

const mapActionCreators = ({
  setPaginationCurrent,
  setPaginationPerPage,
  setPaginationIncrement,
  setPaginationDecrement,
  setPaginationStart,
  setPaginationEnd
});

export default connect( mapStateToProps, mapActionCreators)(muiThemeable()(SongsPagination));
