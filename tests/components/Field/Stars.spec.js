import React from 'react';
import { mount, shallow } from 'enzyme';
import Stars from 'components/Field/Stars';

describe('Components', () => {
  describe('Fields', () => {
    describe('Stars', () => {
      const number = 3;
      const props = { number };
      it('Should render shallow', () => {
        const wrapper = shallow(<Stars {...props} />);
      });
    });
  });
});
