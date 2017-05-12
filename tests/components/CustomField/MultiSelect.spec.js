import React from 'react';
import { mount, shallow } from 'enzyme';
import MultiSelect from 'components/CustomField/MultiSelect';

describe('Components', () => {
  describe('Custom Fields', () => {
    describe('MultiSelect', () => {
      const field = { name: 'testing field name' };
      const props = {
        field
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<MultiSelect {...props} />);
      });
    });
  });
});
