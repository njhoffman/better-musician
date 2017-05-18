import React from 'react';
import { shallow } from 'enzyme';
import Text from 'components/Field/Text';

describe('Components', () => {
  describe('Text', () => {
    const props = { };
    it('Should render shallow', () => {
      shallow(<Text {...props} />);
    });
  });
});
