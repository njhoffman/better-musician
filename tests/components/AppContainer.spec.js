import React from 'react';
import { mount, shallow } from 'enzyme';
import AppContainer from 'components/AppContainer';

describe('Components', () => {
  describe('AppContainer', () => {
    it('Should render shallow', () => {
      const wrapper = shallow(<AppContainer  />);
    });
  });
});
