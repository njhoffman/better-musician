import React from 'react';
import { shallow } from 'enzyme';
import { FieldsView } from 'routes/Fields/components/FieldsView';

describe('Routes', () => {
  describe('Fields', () => {
    describe('Component: FieldsView', () => {
      it('Should render shallow', () => {
        const wrapper = shallow(<FieldsView />);
      });
    });
  });
});
