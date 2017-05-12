import React from 'react';
import { mount, shallow } from 'enzyme';
import Footer from 'components/Footer/Footer';

describe('Components', () => {
  describe('Footer', () => {
    it('Should render shallow', () => {
      const wrapper = shallow(<Footer />);
    });
  });
});
