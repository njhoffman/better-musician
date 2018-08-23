import React, { Component } from 'react';
import _ from 'lodash';
import { isClass } from 'shared/util';
import PropTypes from 'prop-types';
import RenderCustomText from './Text';
import RenderCustomAutoComplete from './AutoComplete';
import RenderCustomSelect from '../Field/Select';
import RenderCustomMultiSelect from './MultiSelect';
// import RenderCheckbox from './Checkbox';
// import RenderRadioButtons from './RadioButtons';
// import RenderDate from './Date';
import CustomYouTubeLink from './YouTubeLink';

import { init as initLog } from 'shared/logger';
const { error } = initLog('custom-field');

/* eslint-disable no-multi-spaces */
const fieldOptions = {
  0: { name: 'Text Box',          component: RenderCustomText },
  1: { name: 'AutoComplete Box',  component: RenderCustomAutoComplete },
  2: { name: 'Select Menu',       component: RenderCustomSelect },
  3: { name: 'Multi-Select Menu', component: RenderCustomMultiSelect },
  4: { name: 'Checkbox'        /* component: RenderCheckbox */ },
  5: { name: 'Radio Buttons'   /* component: RenderRadioButtons */ },
  6: { name: 'Date'            /* component: RenderDate */ },
  7: { name: 'YouTube Link',      component: <CustomYouTubeLink /> },
  8: { name: 'PDF Link'        /* component: RenderPdfLink */ }
};
/* eslint-enable no-multi-spaces */

class RenderCustomField extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired
  }

  state = {
    fieldOptions
  };

  render() {
    const Component = _.get(fieldOptions, `${this.props.field.type}.component`);
    if (isClass(Component)) {
      return (<Component { ...this.props } />);
    } else if (_.isFunction(Component)) {
      return Component({ ...this.props });
    } else {
      error('invalid field type', this.props.field);
      return null;
    }
  }
}

export default RenderCustomField;
