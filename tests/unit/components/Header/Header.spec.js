import React from 'react';
import { shallow } from 'enzyme';
import { Header } from 'components/Header/Header';
import { muiTheme } from 'tests/fixtures';

describe('Components', () => {
  describe('Header', () => {
    const props = {
      user : { get: sinon.stub() },
      muiTheme
    };
    it('Should render shallow', () => {
      shallow(<Header {...props} />);
    });
  });
});
