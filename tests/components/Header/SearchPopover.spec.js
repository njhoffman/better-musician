import React from 'react';
import { mount, shallow } from 'enzyme';
import SearchPopover from 'components/Header/SearchPopover';

describe('Components', () => {
  describe('Header', () => {
    describe('SearchPopover', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<SearchPopover />);
      });
    });
  });
});
