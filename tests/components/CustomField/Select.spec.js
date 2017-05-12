import React from 'react';
import { mount, shallow } from 'enzyme';
import Select from 'components/CustomField/Select';

describe('Components', () => {
  describe('Custom Fields', () => {
    describe('Select', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<Select />);
      });
    });
  });
});
