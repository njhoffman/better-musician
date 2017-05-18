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
      const modalView = { props: { view: 'add' } };
      const props = {
        isView,
        lastActiveField,
        textStyle,
        textInputStyle,
        modalView,
        muiTheme
      };
      console.log(props.muiTheme);
      it('Should render shallow', () => {
        shallow(<AddSongMainTab {...props} />);
      });
    });
  });
});
