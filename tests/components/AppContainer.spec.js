import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import AppContainer from 'components/AppContainer';

const store = createStore({});

describe('Components', () => {
  describe('AppContainer', () => {
    it('Should render shallow', () => {
      const wrapper = shallow(<AppContainer  />);
    });
  });
});
