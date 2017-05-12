import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import Snackbar from 'components/Snackbar';

const store = createStore({});

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
      const wrapper = shallow(<Snackbar {...props} />);
    });
  });
});
