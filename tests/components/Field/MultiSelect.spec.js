import React from 'react';
import { mount, shallow } from 'enzyme';
import MultiSelect from 'components/Field/MultiSelect';

describe('Components', () => {
  describe('Fields', () => {
    describe('MultiSelect', () => {
      const fields = ['test_field'];
      const name = 'test_name';
      const dataSource = 'test_dataSource';
      const props = {
        fields,
        name,
        dataSource
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<MultiSelect {...props} />);
      });
    });
  });
});
