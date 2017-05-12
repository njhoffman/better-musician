import React from 'react';
import { shallow } from 'enzyme';
import { Song } from 'routes/Songs/components/Song';
import { muiTheme } from 'tests/fixtures';

describe('Routes', () => {
  describe('Songs', () => {
    describe('Component: Song', () => {
      const songValues = { title: 'test tile', artist: { fullName: 'artist name' }, difficulty: 4, progress: 2 };
      const maxDifficulty = 10;
      const props = {
        songValues,
        muiTheme,
        maxDifficulty
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<Song {...props} />);
      });
    });
  });
});
