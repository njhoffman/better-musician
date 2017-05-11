import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import SearchPopover from 'components/Header/SearchPopover';

const store = createStore({});

describe('Components', () => {
  describe('Header', () => {
    describe('SearchPopover', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<SearchPopover />);
      });
    });
  });
});
