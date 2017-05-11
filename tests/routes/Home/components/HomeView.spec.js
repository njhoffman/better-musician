import React from 'react';
import { shallow } from 'enzyme';
import  { HomeView } from 'routes/Home/components/HomeView';

describe('Routes', () => {
  describe('Home', () => {
    describe('Component: HomeView', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<HomeView />);
      });
    });
  });
});
