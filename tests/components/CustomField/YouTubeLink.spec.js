import React from 'react';
import { mount, shallow } from 'enzyme';
import YouTubeLink from 'components/CustomField/YouTubeLink';

describe('Components', () => {
  describe('Custom Fields', () => {
    describe('YouTubeLink', () => {
      const field = { name: 'testing field name' };
      const props = {
        field
      };

      it('Should render shallow', () => {
        const wrapper = shallow(<YouTubeLink {...props} />);
      });
    });
  });
});
