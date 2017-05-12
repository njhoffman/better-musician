import React from 'react';
import { mount, shallow } from 'enzyme';
import AutoComplete from 'components/CustomField/AutoComplete';

describe('Components', () => {
  describe('Custom Fields', () => {
    describe('AutoComplete', () => {
      const field = { name: 'testing field name' };
      const props = {
        field
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<AutoComplete {...props} />);
      });
    });
  });
});
