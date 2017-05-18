import React from 'react';
import { shallow } from 'enzyme';
import { StatsView } from 'routes/Stats/components/StatsView';

describe('Routes', () => {
  describe('Stats', () => {
    describe('Component: StatsView', () => {
      it('Should render shallow', () => {
        shallow(<StatsView />);
      });

      it('Should contain the proper content wrapping elements', () => {
        const wrapper = shallow(<StatsView />);
        expect(wrapper.at(0).name()).to.equal('Column');
        expect(wrapper.childAt(0).name()).to.equal('Paper');
        expect(wrapper.at(0).props()).to.contain.all.keys('small', 'medium', 'large');
      });
    });
  });
});
