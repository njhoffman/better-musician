import React from 'react';
import { mount, shallow } from 'enzyme';
import Checkbox from 'components/Field/Checkbox';
import { meta } from 'tests/fixtures';

describe('Components', () => {
  describe('Fields', () => {
    describe('Checkbox', () => {
      const props = { meta };
      it('Should render shallow', () => {
        const wrapper = shallow(<Checkbox {...props} />);
      });
    });
  });
});
