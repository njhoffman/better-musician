import React from 'react';
import { mount, shallow } from 'enzyme';
import ButtonLoader from 'components/ButtonLoader';

describe('Components', () => {
  describe('ButtonLoader', () => {
    const onClick = sinon.stub();
    const props = {
      onClick
    };
    it('Should render shallow', () => {
      const wrapper = shallow(<ButtonLoader {...props} />);
    });
  });
});
