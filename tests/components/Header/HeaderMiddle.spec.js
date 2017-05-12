import React from 'react';
import { mount, shallow } from 'enzyme';
import { muiTheme } from 'tests/fixtures';
import HeaderMiddle from 'components/Header/HeaderMiddle';

describe('Components', () => {
  describe('Header', () => {
    describe('Middle', () => {
      const showAddSongModal = sinon.stub();
      const showFiltersModal = sinon.stub();
      const isOpen = { isOpen: false };
      const modal = {};
      const props = {
        showAddSongModal,
        showFiltersModal,
        isOpen,
        modal,
        muiTheme
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<HeaderMiddle {...props} />);
      });
    });
  });
});
