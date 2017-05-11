import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import HeaderLeft from 'components/Header/HeaderLeft';

const store = createStore({});

describe('Components', () => {
  describe('Header', () => {
    describe('Left', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<HeaderLeft />);
      });
    });
  });
});
