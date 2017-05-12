import React from 'react';
import { shallow } from 'enzyme';
import { EmailSignInForm } from 'routes/Login/components/EmailSignInForm';
import configureStore from 'redux-mock-store';

describe('Routes', () => {
  describe('Login', () => {
    describe('Component: EmailSignInForm', () => {
      const emailSignIn = sinon.stub();
      const auth = { getIn: sinon.stub() };
      const mockStore = configureStore();
      const { dispatch } = mockStore();
      const props = {
        emailSignIn,
        auth,
        dispatch
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<EmailSignInForm {...props} />);
      });
    });
  });
});
