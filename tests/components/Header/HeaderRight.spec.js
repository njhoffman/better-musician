import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import HeaderRight from 'components/Header/HeaderRight';

const store = createStore({});

describe('Components', () => {
  describe('Header', () => {
    describe('Right', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<HeaderRight />);
      });
    });
  });
});
