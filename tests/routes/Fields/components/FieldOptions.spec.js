import React from 'react';
import { shallow } from 'enzyme';
import { FieldOptions } from 'routes/Fields/components/FieldOptions';

describe('Routes', () => {
  describe('Fields', () => {
    describe('Component: FieldOptions', () => {
      const fields = [];
      const props = { fields };
      it('Should render shallow', () => {
        shallow(<FieldOptions {...props} />);
      });
    });
  });
});
