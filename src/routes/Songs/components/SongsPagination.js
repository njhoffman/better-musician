import React from 'react';
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
  setPaginationEnd
}) => (
  <Row className={css.paginationRow}>
    <Column small={3} >
      <div className={css.paginationText}>
        <span>Showing <strong>{paginationStart}</strong> - <strong>{paginationEnd}</strong> of
          <strong> {paginationTotal}</strong> Songs</span>
      </div>
    </Column>
    <Column small={6} >
      <div className={css.buttonWrapper}>
        <RaisedButton
          style={{ minWidth: "50px", margin: "0px 5px" }}
          onTouchTap={setPaginationStart}
          icon={<span><BeforeIcon /><BeforeIcon style={{ marginLeft: '-10px' }} /></span>}
        />
        <RaisedButton
          style={{ minWidth: "50px", margin: "0px 5px" }}
          onTouchTap={setPaginationDecrement}
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
        <span className={css.centerPageTotal}>out of {paginationPages} </span>
        <RaisedButton
          style={{ minWidth: "50px", margin: "0px 5px" }}
          onTouchTap={setPaginationIncrement}
          icon={<NextIcon />}
        />
        <RaisedButton
          style={{ minWidth: "50px", margin: "0px 5px" }}
          onTouchTap={setPaginationEnd}
          icon={<span><NextIcon /><NextIcon style={{ marginLeft: '-10px' }} /></span>}
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

export default (SongsPagination);
