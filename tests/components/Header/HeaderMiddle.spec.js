import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import HeaderMiddle from 'components/Header/HeaderMiddle';

const store = createStore({});

describe('Components', () => {
  describe('Header', () => {
    describe('Middle', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<HeaderMiddle />);
      });
    });
  });
});
