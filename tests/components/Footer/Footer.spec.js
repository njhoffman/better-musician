import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from 'components/Footer/Footer';
import { muiTheme } from 'tests/fixtures';

describe('Components', () => {
  describe('Footer', () => {
    const props = {
      muiTheme
    };
    it('Should render shallow', () => {
      shallow(<Footer {...props} />);
    });
  });
});
