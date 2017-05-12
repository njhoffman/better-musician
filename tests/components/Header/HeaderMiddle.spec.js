import React from 'react';
import { mount, shallow } from 'enzyme';
import HeaderMiddle from 'components/Header/HeaderMiddle';

describe('Components', () => {
  describe('Header', () => {
    describe('Middle', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<HeaderMiddle />);
      });
    });
  });
});
