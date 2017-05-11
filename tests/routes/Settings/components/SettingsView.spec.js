import React from 'react';
import { shallow } from 'enzyme';
import  { SettingsView } from 'routes/Settings/components/SettingsView';

describe('Routes', () => {
  describe('Settings', () => {
    describe('Component: SettingsView', () => {
      const resetSettings = sinon.stub();
      const updateSettings = sinon.stub();
      const props = {
        resetSettings,
        updateSettings
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<SettingsView {...props} />);
      });

      it('Should contain the proper content wrapping elements', () => {
        const wrapper = shallow(<SettingsView {...props} />);
        expect(wrapper.at(0).name()).to.equal('Column');
        expect(wrapper.childAt(0).name()).to.equal('Paper');
        expect(wrapper.at(0).props()).to.contain.all.keys('small', 'medium', 'large');
      });
    });
  });
});
