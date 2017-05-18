import React from 'react';
import { shallow } from 'enzyme';
import { SongsPagination } from 'routes/Songs/components/SongsPagination';
import { muiTheme } from 'tests/fixtures';

describe('Routes', () => {
  describe('Songs', () => {
    describe('Component: SongPagination', () => {
      const props = {
        muiTheme
      };
      it('Should render shallow', () => {
        shallow(<SongsPagination {...props} />);
      });
    });
  });
});
