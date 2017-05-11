import React from 'react';
import { shallow } from 'enzyme';
import RegisterViewConnected, { RegisterView } from 'routes/Register/components/RegisterView';
import EmailSignUpForm from 'routes/Register/components/EmailSignUpForm';
import OAuthSignInButton from 'components/OAuthSignInButton';

describe('Routes', () => {
  describe('Register', () => {
    describe('Component: RegisterView', () => {
      it('Should renders shallow', () => {
        const wrapper = shallow(<RegisterView />);
      });

      it('Should contain the proper content wrapping elements', () => {
        const wrapper = shallow(<RegisterView />);
        expect(wrapper.find('Column')).to.have.length(1);
        expect(wrapper.find('Column').find('Paper')).to.have.length(1);
        expect(wrapper.find('Column').props()).to.contain.all.keys('small', 'medium', 'large');
      });

      it('Should contain a register button and a forgot password button', () => {
        const wrapper = shallow(<RegisterView />);
        expect(wrapper.find(OAuthSignInButton)).to.have.length(2);
      });

      it('Should contain EmailSignUpForm component with next prop set to a function', () => {
        const wrapper = shallow(<RegisterView />);
        expect(wrapper.find(EmailSignUpForm)).to.have.length(1);
      });
    });
  });
});
