import React from 'react';
import { mount, shallow } from 'enzyme';
import { DrawerMenu } from 'components/DrawerMenu/DrawerMenu';
import { muiTheme } from 'tests/fixtures';

describe('Components', () => {
  describe('DrawerMenu', () => {
    const hideDrawerMenu = sinon.stub();
    const isOpen = false;
    const user = { get: sinon.stub() };
    const props = {
      hideDrawerMenu,
      isOpen,
      user,
      muiTheme
    };
    it('Should render shallow', () => {
      const wrapper = shallow(<DrawerMenu {...props} />);
    });
  });
});
