import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import { Row, Column } from 'react-foundation';
// import { Field } from 'redux-form';
// import { RenderChip, RenderSelect } from 'components/Field';

const addOption = (fields) => {
  fields.push('testing');
};

const RenderMultiSelect = ({
  fields,
  label,
  name,
  disabled,
  labelStyle,
  inputStyle,
  dataSource,
  ...custom }) => {
  return (
    <Column centerOnSmall small={12}>
      <Row>
        <Column centerOnSmall small={6}>
          <Row>
            <Column centerOnSmall small={disabled ? 12 : 8}>
          {/* <Field */}
          {/*   label={label} */}
          {/*   onChange={(e) => (e)} */}
          {/*   component={RenderSelect} */}
          {/*   disabled={disabled} */}
          {/*   underlineShow={disabled} */}
          {/*   labelStyle={inputStyle} */}
          {/*   floatingLabelStyle={{ ...labelStyle, ...(disabled ? { textAlign: 'center', width: '100%' } : {}) }} */}
          {/*   iconStyle={{ visibility: disabled ? 'hidden' : 'visible' }} */}
          {/*   dataSource={dataSource} */}
          {/*   name='optionText' */}
          {/* /> */}
            </Column>
            <Column centerOnSmall small={disabled ? 0 : 4}>
              {!disabled &&
                <RaisedButton
                  onTouchTap={() => addOption(fields)}
                  secondary
                  label='Add' />
              }
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        <Column
          centerOnSmall
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
          small={10}>
          {fields.map((name, idx, fields) => {
            // if (disabled) {
            //   return (
            //     <Field
            //       key={idx}
            //       name={name}
            //       onChange={() => { }}
            //       component={RenderChip}
            //       style={{ margin: '5px 2px', fontSize: '0.8em' }} />
            //   );
            // } else {
            //   return (
            //     <Field
            //       key={idx}
            //       name={name}
            //       onChange={() => { }}
            //       component={RenderChip}
            //       onRequestDelete={() => fields.remove(idx)}
            //       style={{ margin: '5px 2px', fontSize: '0.8em' }} />
            //   );
            // }
          })}
        </Column>
      </Row>
    </Column>
  );
};

RenderMultiSelect.propTypes = {
  fields:     PropTypes.any.isRequired,
  name:       PropTypes.string,
  disabled:   PropTypes.bool,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  label:      PropTypes.string,
  dataSource: PropTypes.any.isRequired
};

export default RenderMultiSelect;
