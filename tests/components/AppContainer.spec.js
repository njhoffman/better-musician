import React from 'react';
import { mount, shallow } from 'enzyme';
import AppContainer from 'components/AppContainer';
import configureStore from 'redux-mock-store';

describe('Components', () => {
  describe('AppContainer', () => {
    const routes = {};
    const mockStore = configureStore();
    const store = mockStore();
    const props = {
      routes,
      store
    };

    it('Should render shallow', () => {
      const wrapper = shallow(<AppContainer {...props}  />);
    });
  });
});
