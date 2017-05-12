import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderCustomText from './Text';
import RenderCustomAutoComplete from './AutoComplete';
import RenderCustomSelect from './Select';
import RenderCustomMultiSelect from './MultiSelect';
// import RenderCheckbox from './Checkbox';
// import RenderRadioButtons from './RadioButtons';
// import RenderDate from './Date';
import RenderCustomYouTubeLink from './YouTubeLink';

/* eslint-disable no-multi-spaces */
const fieldOptions = {
  0: { name: 'Text Box',          component: RenderCustomText },
  1: { name: 'AutoComplete Box',  component: RenderCustomAutoComplete },
  2: { name: 'Select Menu',       component: RenderCustomSelect },
  3: { name: 'Multi-Select Menu', component: RenderCustomMultiSelect },
  4: { name: 'Checkbox'           /* component:  RenderCheckbox */ },
  5: { name: 'Radio Buttons'      /* component:  RenderRadioButtons */ },
  6: { name: 'Date'               /* component:  RenderDate */ },
  7: { name: 'YouTube Link',      component: (props) => <RenderCustomYouTubeLink {...props} /> },
  8: { name: 'PDF Link'           /* component:  RenderPdfLink */ }
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
    if (!isNaN(this.props.field.type) &&
      fieldOptions[this.props.field.type] &&
      fieldOptions[this.props.field.type].component) {
      return fieldOptions[this.props.field.type].component({ ...this.props });
    } else {
      console.info('invalid field type', this.props.field.type);
      return null;
    }
  }
};

export default RenderCustomField;
