import React from 'react';
import { shallow } from 'enzyme';
import  { LoginView } from 'routes/Login/components/LoginView';

describe('Routes', () => {
  describe('Login', () => {
    describe('Component: LoginView', () => {
      const handleLoginSuccess = sinon.stub();
      const props = {
        handleLoginSuccess
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<LoginView {...props} />);
      });

      it('Should contain the proper content wrapping elements', () => {
        const wrapper = shallow(<LoginView {...props} />);
        expect(wrapper.at(0).name()).to.equal('Column');
        expect(wrapper.childAt(0).name()).to.equal('Paper');
        expect(wrapper.at(0).props()).to.contain.all.keys('small', 'medium', 'large');
      });
    });
  });
});
