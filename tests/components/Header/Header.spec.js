import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import Header from 'components/Header';

const store = createStore({});

describe('Components', () => {
  describe('Header', () => {
    it('Should render shallow', () => {
      const wrapper = shallow(<Header />);
    });
  });
});
