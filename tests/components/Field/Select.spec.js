import React from 'react';
import { shallow } from 'enzyme';
import Select from 'components/Field/Select';

describe('Components', () => {
  describe('Fields', () => {
    describe('Select', () => {
      const dataSource = 'test_datSource';
      const props = { dataSource };
      it('Should render shallow', () => {
        shallow(<Select {...props} />);
      });
    });
  });
});
