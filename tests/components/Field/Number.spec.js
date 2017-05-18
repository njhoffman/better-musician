import React from 'react';
import { shallow } from 'enzyme';
import Number from 'components/Field/Number';

describe('Components', () => {
  describe('Fields', () => {
    describe('Number', () => {
      const props = { };
      it('Should render shallow', () => {
        shallow(<Number {...props} />);
      });
    });
  });
});
