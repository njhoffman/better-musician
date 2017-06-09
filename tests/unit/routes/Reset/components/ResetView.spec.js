import React from 'react';
import { shallow } from 'enzyme';
import { ResetView } from 'routes/Reset/components/ResetView';

describe('Routes', () => {
  describe('Reset', () => {
    describe('Component: ResetView', () => {
      const onClick = sinon.stub();
      const props = {
        onClick
      };
      it('Should render shallow', () => {
        shallow(<ResetView {...props} />);
      });

      it('Should contain the proper content wrapping elements', () => {
        const wrapper = shallow(<ResetView {...props} />);
        expect(wrapper.at(0).name()).to.equal('Column');
        expect(wrapper.childAt(0).name()).to.equal('Paper');
        expect(wrapper.at(0).props()).to.contain.all.keys('small', 'medium', 'large');
      });
    });
  });
});
