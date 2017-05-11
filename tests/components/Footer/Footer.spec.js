import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import Footer from 'components/Footer/Footer';

const store = createStore({});

describe('Components', () => {
  describe('Footer', () => {
    it('Should render shallow', () => {
      const wrapper = shallow(<Footer />);
    });
  });
});
