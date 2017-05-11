import React from 'react';
import { shallow } from 'enzyme';
import  { HomeView } from 'routes/Home/components/HomeView';

describe('Routes', () => {
  describe('Home', () => {
    describe('Component: HomeView', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<HomeView />);
      });

      it('Should contain the proper content wrapping elements', () => {
        const wrapper = shallow(<HomeView />);
        expect(wrapper.at(0).name()).to.equal('Column');
        expect(wrapper.childAt(0).name()).to.equal('Paper');
        expect(wrapper.at(0).props()).to.contain.all.keys('small', 'medium', 'large');
      });
    });
  });
});
