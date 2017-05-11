import React from 'react';
import { shallow } from 'enzyme';
import  { SettingsView } from 'routes/Settings/components/SettingsView';

describe('Routes', () => {
  describe('Settings', () => {
    describe('Component: SettingsView', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<SettingsView />);
      });
    });
  });
});
