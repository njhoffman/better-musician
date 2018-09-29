import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Column } from 'react-foundation';
import { TextField } from '@material-ui/core';
// import Textbox from './Textbox';
import { Field } from 'redux-form';
import createComponent from './createFormField';
import mapError from './mapError';

const youtubeRE = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/;

const TextboxForm = createComponent(TextField, ({
    input: { onChange, ...inputProps },
    onChange: onFieldChange,
    defaultValue,
    ...props
  }) => ({
    ...mapError(props),
    ...inputProps,
    onChange: event => {
      onChange(event.target.value);
      if (onFieldChange) {
        onFieldChange(event.target.value);
      }
    },
  })
);

class YouTubeLink extends Component {
  static propTypes = {
    disabled      : PropTypes.bool,
    preview       : PropTypes.bool,
    initialValues : PropTypes.object,
    fields        : PropTypes.array.isRequired,
    style         : PropTypes.object,
    id            : PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      videoId: this.parseUrl(get(props.initialValues, props.input.name))
    };
  }

  parseUrl(val) {
    const videoId = youtubeRE.test(val) ? val.match(youtubeRE)[1] : val;
    if (this.state) {
      this.setState({ videoId });
    }
    return videoId;
  }

  render() {
    if (this.props.preview) {
      return (
        <Field
          style={{ width: '200px', marginTop: '0px' }}
          name={this.props.id}
          component={TextField}
          label={this.props.field.label} />
      );
    } else {
      return (
        <Column>
          <Row>
            <Column centerOnSmall>
              <TextboxForm
                name={this.props.input.name}
                onChange={(e, val) => this.parseUrl(val)}
                disabled={this.props.disabled}
                label={this.props.fields[0].label}
                {...this.props}
              />
            </Column>
          </Row>
          <Row>
            <Column />
          </Row>
          <Row>
            <Column centerOnSmall>
              <iframe id='player' type='text/html'
                width='350'
                height='250'
                src={'http://www.youtube.com/embed/' + this.state.videoId} />
            </Column>
          </Row>
        </Column>
      );
    }
  }
}

export default YouTubeLink;
