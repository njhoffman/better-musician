import React from 'react';
import { mount, shallow } from 'enzyme';
import { Header } from 'components/Header/Header';
import { muiTheme } from 'tests/fixtures';

describe('Components', () => {
  describe('Header', () => {
    const props = {
      user : { get: sinon.stub() },
      muiTheme
    };
    it('Should render shallow', () => {
      const wrapper = shallow(<Header {...props} />);
    });
  });
});
