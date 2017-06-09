import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from 'components/Field/Checkbox';
import { meta } from 'tests/fixtures';

describe('Components', () => {
  describe('Fields', () => {
    describe('Checkbox', () => {
      const props = { meta };
      it('Should render shallow', () => {
        shallow(<Checkbox {...props} />);
      });
    });
  });
});
