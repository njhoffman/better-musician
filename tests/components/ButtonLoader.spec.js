import React from 'react';
import { shallow } from 'enzyme';
import ButtonLoader from 'components/ButtonLoader';

describe('Components', () => {
  describe('ButtonLoader', () => {
    const onClick = sinon.stub();
    const props = {
      onClick
    };
    it('Should render shallow', () => {
      shallow(<ButtonLoader {...props} />);
    });
  });
});
