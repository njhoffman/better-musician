import React from 'react';
import { shallow } from 'enzyme';
import { ProfileView } from 'routes/Profile/components/ProfileView';
import { muiTheme, api } from 'tests/fixtures';

describe('Routes', () => {
  describe('ProfileView', () => {
    describe('Component: ProfileView', () => {
      const updateProfile = sinon.stub();
      const props = {
        muiTheme,
        api,
        updateProfile
      };

      it('Should render shallow', () => {
        // const wrapper = shallow(<ProfileView muiTheme={muiTheme} api={api} updateProfile={updateProfile} />);
        shallow(<ProfileView {...props} />);
      });

      it('Should contain the proper content wrapping elements', () => {
        const wrapper = shallow(<ProfileView {...props} />);
        expect(wrapper.at(0).name()).to.equal('Column');
        expect(wrapper.childAt(0).name()).to.equal('Paper');
        expect(wrapper.at(0).props()).to.contain.all.keys('small', 'medium', 'large');
      });
    });
  });
});
