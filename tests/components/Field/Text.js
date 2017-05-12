import React from 'react';
import { mount, shallow } from 'enzyme';
import Text from 'components/Field/Text';

describe('Components', () => {
  describe('Text', () => {
    const props = { };
    it('Should render shallow', () => {
      const wrapper = shallow(<Text {...props} />);
    });
  });
});
