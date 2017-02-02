import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Row, Column } from 'react-foundation';
import { RaisedButton, TextField } from 'material-ui';
import {
  MdNavigateBefore as BeforeIcon,
  MdNavigateNext as NextIcon
} from 'react-icons/lib/md';

import css from './SongsPagination.scss';

const SongsPagination = ({
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
          <strong>{paginationStart}</strong> - <strong>{paginationEnd}</strong> of <strong>{paginationTotal}</strong> Songs
        </span>
      </div>
    </Column>
    <Column small={6} >
      <div className={css.buttonWrapper}>
        <RaisedButton
          style={{ minWidth: "50px", fontSize: "1.4em", margin: "0px 5px" }}
          secondary={true}
          onTouchTap={setPaginationStart}
          icon={<span style={{ color: muiTheme.palette.textColor }}><BeforeIcon /><BeforeIcon style={{ marginLeft: '-10px' }} /></span>}
        />
        <RaisedButton
          style={{ minWidth: "50px", fontSize: "1.4em", margin: "0px 5px" }}
          onTouchTap={setPaginationDecrement}
          secondary={true}
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
          style={{ minWidth: "50px", fontSize: "1.4em", margin: "0px 5px" }}
          secondary={true}
          onTouchTap={setPaginationIncrement}
          icon={<NextIcon />}
        />
        <RaisedButton
          style={{ minWidth: "50px", fontSize: "1.4em", margin: "0px 5px" }}
          secondary={true}
          onTouchTap={setPaginationEnd}
          icon={<span style={{ color: muiTheme.palette.textColor }}><NextIcon /><NextIcon style={{ marginLeft: '-10px' }} /></span>}
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

SongsPagination.propTypes = {};

export default muiThemeable()(SongsPagination);
