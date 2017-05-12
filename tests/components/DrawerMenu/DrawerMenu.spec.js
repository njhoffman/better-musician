import React from 'react';
import { mount, shallow } from 'enzyme';
import DrawerMenu from 'components/DrawerMenu';

describe('Components', () => {
  describe('DrawerMenu', () => {
    it('Should render shallow', () => {
      const wrapper = shallow(<DrawerMenu />);
    });
  });
});
