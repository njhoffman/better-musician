import React from 'react';
import { shallow } from 'enzyme';
import { EmailSignUpForm } from 'routes/Register/components/EmailSignUpForm';
import configureStore from 'redux-mock-store';

describe('Routes', () => {
  describe('Register', () => {
    describe('Component: EmailSignUpForm', () => {
      const emailSignUp = sinon.stub();
      const auth = { getIn: sinon.stub() };
      const mockStore = configureStore();
      const { dispatch } = mockStore();
      const props = {
        emailSignUp,
        auth,
        dispatch
      };
      it('Should render shallow', () => {
        shallow(<EmailSignUpForm {...props} />);
      });
    });
  });
});
