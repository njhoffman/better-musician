import React from 'react';
import { mount, shallow } from 'enzyme';
import Slider from 'components/Field/Slider';

describe('Components', () => {
  describe('Fields', () => {
    describe('Slider', () => {
      const input = { value: 'test_value' };
      const props = { input };
      it('Should render shallow', () => {
        const wrapper = shallow(<Slider {...props} />);
      });
    });
  });
});
