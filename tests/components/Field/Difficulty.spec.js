import React from 'react';
import { mount, shallow } from 'enzyme';
import Difficulty from 'components/Field/Difficulty';

describe('Components', () => {
  describe('Fields', () => {
    describe('Difficulty', () => {
      const difficulty = 1;
      const maxDifficulty = 10;
      const props = {
        difficulty,
        maxDifficulty
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<Difficulty {...props} />);
      });
    });
  });
});
