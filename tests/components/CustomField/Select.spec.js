import React from 'react';
import { shallow } from 'enzyme';
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
        shallow(<Select {...props} />);
      });
    });
  });
});
