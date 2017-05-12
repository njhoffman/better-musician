import React from 'react';
import { mount, shallow } from 'enzyme';
import AutoComplete from 'components/Field/AutoComplete';

describe('Components', () => {
  describe('Fields', () => {
    describe('AutoComplete', () => {
      const props = { };
      it('Should render shallow', () => {
        const wrapper = shallow(<AutoComplete {...props} />);
      });
    });
  });
});
