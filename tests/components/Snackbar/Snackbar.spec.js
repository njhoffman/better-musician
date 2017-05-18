import React from 'react';
import { shallow } from 'enzyme';
import Snackbar from 'components/Snackbar';

describe('Components', () => {
  describe('Snackbar', () => {
    const message = 'test message';
    const uiHideSnackbar = sinon.stub();
    const isOpen = false;
    const props = {
      uiHideSnackbar,
      message,
      isOpen
    };
    it('Should render shallow', () => {
      shallow(<Snackbar {...props} />);
    });
  });
});
