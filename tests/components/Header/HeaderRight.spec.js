import React from 'react';
import { mount, shallow } from 'enzyme';
import HeaderRight from 'components/Header/HeaderRight';

describe('Components', () => {
  describe('Header', () => {
    describe('Right', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<HeaderRight />);
      });
    });
  });
});
