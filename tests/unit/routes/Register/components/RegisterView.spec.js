import React from 'react';
import { shallow } from 'enzyme';
import { RegisterView } from 'routes/Register/components/RegisterView';
import EmailSignUpForm from 'routes/Register/components/EmailSignUpForm';
import OAuthSignInButton from 'components/OAuthSignInButton';
import configureStore from 'redux-mock-store';

describe('Routes', () => {
  describe('Register', () => {
    describe('Component: RegisterView', () => {
      const handleRegisterSuccess = sinon.stub();
      const props = {
        handleRegisterSuccess
      };
      it('Should renders shallow', () => {
        shallow(<RegisterView {...props} />);
      });

      it('Should render the proper content wrapping elements', () => {
        const wrapper = shallow(<RegisterView {...props} />);
        expect(wrapper.at(0).name()).to.equal('Column');
        expect(wrapper.childAt(0).name()).to.equal('Paper');
        expect(wrapper.at(0).props()).to.contain.all.keys('small', 'medium', 'large');
      });

      it('Should render a Google oAuth button and a Facebook oAuth button', () => {
        const wrapper = shallow(<RegisterView {...props} />);
        expect(wrapper.find(OAuthSignInButton)).to.have.length(2);
        const oauth = wrapper.find(OAuthSignInButton);
        console.log(Object.keys(oauth));
      });

      it('Should render EmailSignUpForm component with next prop set to a function', () => {
        const wrapper = shallow(<RegisterView {...props} />);
        console.log(wrapper.props().children);
        expect(wrapper.find(EmailSignUpForm)).to.have.length(1);
      });

      it('Should pass facebook and google icon image element to oAuth button', () => {
        const mockStore = configureStore();
        const store = mockStore();
        const wrapper = shallow(<OAuthSignInButton store={store} />);
        console.log(wrapper.props().icon);
      });
    });
  });
});
