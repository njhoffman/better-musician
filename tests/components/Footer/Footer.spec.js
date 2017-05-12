import React from 'react';
import { mount, shallow } from 'enzyme';
import { Footer } from 'components/Footer/Footer';
import { muiTheme } from 'tests/fixtures';

describe('Components', () => {
  describe('Footer', () => {
    const props = {
      muiTheme
    };
    it('Should render shallow', () => {
      const wrapper = shallow(<Footer {...props} />);
    });
  });
});
