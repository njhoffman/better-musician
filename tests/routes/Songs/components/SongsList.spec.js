import React from 'react';
import { shallow } from 'enzyme';
import { SongsList } from 'routes/Songs/components/SongsList';

describe('Routes', () => {
  describe('Songs', () => {
    describe('Component: SongsList', () => {
      const setSort = sinon.stub();
      const props = {
        setSort
      };
      it('Should render shallow', () => {
        shallow(<SongsList {...props} />);
      });
    });
  });
});
