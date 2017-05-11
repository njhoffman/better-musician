import React from 'react';
import { shallow } from 'enzyme';
import { FieldsView } from 'routes/Fields/components/FieldsView';
import { muiTheme } from 'tests/fixtures';

describe('Routes', () => {
  describe('Fields', () => {
    describe('Component: FieldsView', () => {
      const updateField = sinon.stub();
      const addField = sinon.stub();
      const onClick = sinon.stub();
      const props = {
        updateField,
        addField,
        onClick,
        muiTheme
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<FieldsView {...props} />);
      });
    });
  });
});
