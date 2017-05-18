import React from 'react';
import { shallow } from 'enzyme';
import Chip from 'components/Field/Chip';

describe('Components', () => {
  describe('Fields', () => {
    describe('Fields', () => {
      describe('Chip', () => {
        const input = { value: 'test_value' };
        const props = { input };
        it('Should render shallow', () => {
          shallow(<Chip {...props} />);
        });
      });
    });
  });
});
