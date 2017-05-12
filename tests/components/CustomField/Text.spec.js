import React from 'react';
import { mount, shallow } from 'enzyme';
import Text from 'components/CustomField/Text';

describe('Components', () => {
  describe('Custom Fields', () => {
    describe('Text', () => {
      const field = { name: 'testing field name' };
      const props = {
        field
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<Text {...props} />);
      });
    });
  });
});
