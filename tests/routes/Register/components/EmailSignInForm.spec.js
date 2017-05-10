import React from 'react';
import { shallow } from 'enzyme';
import EmailSignUpFormConnected, { EmailSignUpForm } from 'routes/Register/components/EmailSignUpForm';
import configureStore from 'redux-mock-store';

import { reduxForm } from 'redux-form';

describe('(Routes: Register) Component: EmailSignUpForm', () => {
  const mockStore = configureStore();

  it('Should renders shallow', () => {
  //   const getState = {
  //     form: {
  //       'register' : 'test'
  //
  //     }
  //   }
    // const store = mockStore(getState);
    // const wrapper = shallow(<EmailSignUpForm store={store} />);
    // console.info(wrapper.debug());
    // console.info(wrapper.dive().debug());
    // console.info(wrapper.dive().dive().debug());
    // console.info(wrapper.dive().dive().dive().debug());
    // console.info(wrapper.dive().dive().dive().dive().debug());
    // console.info(wrapper.dive().dive().dive().dive().dive().debug());

    // it('Should contain an email, password and password confirmation field', () => { });
    // it('Should contain a submit button and a reset password button', () => { });
    // it('Should disable the fields if the user is signed in or the emailSignUp endpoint is loading', () { });
    // it('Should invoke submit handler on "Sign Up Button" click', () => { });
    // it('Should show errors if emailSignUp endpoint contains errors', () => { });

  });

});
