import React from 'react';
import { mount, shallow } from 'enzyme';
import createStore from 'store/createStore';
import ButtonLoader from 'components/ButtonLoader';

const store = createStore({});

describe('Components', () => {
  describe('ButtonLoader', () => {
    it('Should render shallow', () => {
      const wrapper = shallow(<ButtonLoader />);
    });
  });
});
