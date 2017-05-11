import React from 'react';
import { shallow } from 'enzyme';
import  { StatsView } from 'routes/Stats/components/StatsView';

describe('Routes', () => {
  describe('Stats', () => {
    describe('Component: StatsView', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<StatsView />);
      });
    });
  });
});
