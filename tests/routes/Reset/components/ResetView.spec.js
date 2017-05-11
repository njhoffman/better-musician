import React from 'react';
import { shallow } from 'enzyme';
import  { LoginView } from 'routes/Login/components/LoginView';

describe('Routes', () => {
  describe('Login', () => {
    describe('Component: LoginView', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<LoginView />);
      });
    });
  });
});
