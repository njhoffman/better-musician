import React from 'react';
import { mount, shallow } from 'enzyme';
import Select from 'components/CustomField/Select';

describe('Components', () => {
  describe('Custom Fields', () => {
    describe('Select', () => {
      const field = { name: 'testing field name' };
      const optionValues = {};
      const props = {
        field,
        optionValues
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<Select {...props} />);
      });
    });
  });
});