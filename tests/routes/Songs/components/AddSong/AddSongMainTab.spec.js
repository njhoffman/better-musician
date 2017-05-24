import React from 'react';
import { shallow } from 'enzyme';
import { muiTheme } from 'tests/fixtures';
import  { AddSongMainTab } from 'routes/Songs/components/AddSong/AddSongMainTab';

describe('Routes', () => {
  describe('Songs', () => {
    describe('Component: AddSongMainTab', () => {
      const isView = false;
      const lastActiveField = '';
      const textStyle = { };
      const textInputStyle = {};
      const modalView = {
        isView : () =>  false,
        isEdit : () => false,
        isAdd : () =>  true,
        getName: () => 'add'
      };
      const props = {
        isView,
        lastActiveField,
        textStyle,
        textInputStyle,
        modalView,
        muiTheme
      };
      it('Should render shallow', () => {
        shallow(<AddSongMainTab {...props} />);
      });
    });
  });
});
