import React from 'react';
import { shallow } from 'enzyme';
import { SongsListHeader } from 'routes/Songs/components/SongsListHeader';
import { muiTheme } from 'tests/fixtures';

describe('Routes', () => {
  describe('Songs', () => {
    describe('Component: SongListHeader', () => {
      const name = 'test name';
      const displayName = 'test display name';
      const setSort = sinon.stub();
      const props = {
        name,
        displayName,
        muiTheme,
        setSort
      };
      it('Should render shallow', () => {
        shallow(<SongsListHeader {...props} />);
      });
    });
  });
});
