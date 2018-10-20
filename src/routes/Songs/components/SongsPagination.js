import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { TextField, Typography, withTheme } from '@material-ui/core';
import Button from 'components/Button';
import {
  MdNavigateBefore as BeforeIcon,
  MdNavigateNext as NextIcon
} from 'react-icons/md';

import {
  paginationTotal as paginationTotalSelector,
  paginationStart as paginationStartSelector,
  paginationPages as paginationPagesSelector,
  paginationEnd as paginationEndSelector
} from 'routes/Songs/modules/selectors';

import css from './SongsPagination.scss';

const styleObj = {
  buttons: {
    minWidth: '25px',
    fontSize: '1.4em',
    margin: '0px 5px',
    minHeight: 'unset',
    padding: '0px 16px'
  }
};
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
  theme
}) => (
  <Row className={css.paginationRow}>
    <Column small={3} >
      <Typography className={css.paginationText}>
        <span>
          <strong>{paginationStart}</strong> -
          <strong> {paginationEnd}</strong> of
          <strong>{paginationTotal}</strong> Songs
        </span>
      </Typography>
    </Column>
    <Column small={6} >
      <div className={css.buttonWrapper}>
        <Button
          style={styleObj.buttons}
          className={css.beginning}
          variant='contained'
          color='secondary'
          icon={<BeforeIcon />}
          onClick={setPaginationStart} />
        <Button
          style={styleObj.buttons}
          variant='contained'
          className={css.prev}
          onClick={setPaginationDecrement}
          icon={<BeforeIcon />}
          color='secondary' />
        <TextField
          type='number'
          name='paginationCurrent'
          value={paginationCurrent}
          onChange={setPaginationCurrent}
          style={{ width: '40px' }} />
        <span className={css.centerPageTotal}> / {paginationPages} </span>
        <Button
          style={styleObj.buttons}
          variant='contained'
          className={css.next}
          color='secondary'
          icon={<NextIcon />}
          onClick={setPaginationIncrement} />
        <Button
          style={styleObj.buttons}
          className={css.end}
          variant='contained'
          color='secondary'
          icon={<NextIcon />}
          onClick={setPaginationEnd} />
      </div>
    </Column>
    <Column small={3}>
      <div className={css.buttonWrapper}>
        <TextField
          type='number'
          name='paginationPage'
          defaultValue={paginationPerPage}
          onChange={setPaginationPerPage}
          style={{ width: '50px' }} />
        <Typography variant='caption'>Per Page</Typography>
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
  theme:                  PropTypes.object.isRequired
};

const setPaginationCurrent = (e, val) => (dispatch) => {
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: parseInt(val) });
};

const setPaginationPerPage = (e, val) => (dispatch) => {
  dispatch({ type: 'SET_PAGINATION_PER_PAGE', payload: parseInt(val) });
};

const setPaginationIncrement = () => (dispatch, getState) => {
  const curr = parseInt(getState().SongsView.paginationCurrent);
  const val = curr + 1 > paginationEndSelector(getState())
    ? paginationEndSelector(getState())
    : curr + 1;
  dispatch({ type: 'SET_PAGINATION_CURRENT', payload: val });
};

const setPaginationDecrement = () => (dispatch, getState) => {
  const curr = parseInt(getState().SongsView.paginationCurrent);
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
  paginationCurrent: state.SongsView ? state.SongsView.paginationCurrent : null,
  paginationPerPage: state.SongsView ? state.SongsView.paginationPerPage : null,
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

export default connect(mapStateToProps, mapActionCreators)(withTheme()(SongsPagination));
