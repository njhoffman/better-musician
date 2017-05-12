import React from 'react';
import { mount, shallow } from 'enzyme';
import Select from 'components/Field/Select';

describe('Components', () => {
  describe('Fields', () => {
    describe('Select', () => {
      const dataSource = 'test_datSource';
      const props = { dataSource };
      it('Should render shallow', () => {
        const wrapper = shallow(<Select {...props} />);
      });
    });
  });
});
