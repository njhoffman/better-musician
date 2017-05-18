import React from 'react';
import { shallow } from 'enzyme';
import SearchPopover from 'components/Header/SearchPopover';

describe('Components', () => {
  describe('Header', () => {
    describe('SearchPopover', () => {
      const onRequestClose = sinon.stub();
      const isOpen = false;
      const props = {
        onRequestClose,
        isOpen
      };
      it('Should render shallow', () => {
        shallow(<SearchPopover {...props} />);
      });
    });
  });
});
