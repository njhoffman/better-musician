import React from 'react';
import { shallow } from 'enzyme';
import  { SongsView } from 'routes/Songs/components/SongsView';

describe('Routes', () => {
  describe('Songs', () => {
    describe('Component: SongsView', () => {
      it('Should render shallow', () => {
        shallow(<SongsView />);
      });
    });
  });
});
