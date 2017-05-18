import React from 'react';
import { shallow } from 'enzyme';
import Text from 'components/CustomField/Text';

describe('Components', () => {
  describe('Custom Fields', () => {
    describe('Text', () => {
      const field = { name: 'testing field name' };
      const props = {
        field
      };
      it('Should render shallow', () => {
        shallow(<Text {...props} />);
      });
    });
  });
});
