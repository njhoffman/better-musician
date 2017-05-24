import React from 'react';
import { shallow } from 'enzyme';
import { muiTheme } from 'tests/fixtures';
import  { AddSongModal } from 'routes/Songs/components/AddSong/AddSongModal';

describe('Routes', () => {
  describe('Songs', () => {
    describe('Component: AddSongModal', () => {
      const addSong = sinon.stub();
      const uiHideModal = sinon.stub();
      const editSong = sinon.stub();
      const isOpen = true;
      const modal = { props: { view: 'add' } };
      const savedTabs = [];
      const props = {
        addSong,
        uiHideModal,
        editSong,
        isOpen,
        modal,
        savedTabs,
        muiTheme
      };
      it('Should render shallow', () => {
        shallow(<AddSongModal {...props} />);
      });
    });
  });
});
