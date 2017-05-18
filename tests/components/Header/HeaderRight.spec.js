import React from 'react';
import { shallow } from 'enzyme';
import { muiTheme } from 'tests/fixtures';
import HeaderRight from 'components/Header/HeaderRight';

describe('Components', () => {
  describe('Header', () => {
    describe('Right', () => {
      const props = {
        muiTheme
      };
      it('Should render shallow', () => {
        shallow(<HeaderRight {...props} />);
      });
    });
  });
});
