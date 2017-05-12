import React from 'react';
import { shallow } from 'enzyme';
import { FieldList } from 'routes/Fields/components/FieldList';

describe('Routes', () => {
  describe('Fields', () => {
    describe('Component: FieldsList', () => {
      const savedTabs = [];
      const cancelEdit = sinon.stub();
      const editField = sinon.stub();
      const deleteField = sinon.stub();
      const props = {
        savedTabs,
        cancelEdit,
        editField,
        deleteField
      };
      it('Should render shallow', () => {
        const wrapper = shallow(<FieldList {...props} />);
      });
    });
  });
});
