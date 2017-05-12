import React from 'react';
import { mount, shallow } from 'enzyme';
import Chip from 'components/Field/Chip';

describe('Components', () => {
  describe('Fields', () => {
    describe('Fields', () => {
      describe('Chip', () => {
        const input = { value: 'test_value' };
        const props = { input };
        it('Should render shallow', () => {
          const wrapper = shallow(<Chip {...props} />);
        });
      });
    });
  });
});
