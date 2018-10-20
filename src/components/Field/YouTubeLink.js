import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Column } from 'react-foundation';
import { TextField, withStyles } from '@material-ui/core';
// import Textbox from './Textbox';
import { Field } from 'redux-form';
import createComponent from './createFormField';
import mapError from './mapError';

const styles = (theme) => ({
  inputRow: {
    marginBottom: '20px'
  }
});

const youtubeRE = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/;

const TextboxForm = createComponent(TextField, ({
  input: { onChange, ...inputProps },
  onChange: onFieldChange,
  defaultValue,
  ...props
}) => ({
  ...mapError(props),
  ...inputProps,
  onChange: (event) => {
    onChange(event.target.value);
    if (onFieldChange) {
      onFieldChange(event.target.value);
    }
  },
}));

class YouTubeLink extends Component {
  static defaultProps = {
    preview: false,
  };

  static propTypes = {
    preview       : PropTypes.bool,
    initialValues : PropTypes.object,
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
    const {
      preview, id, meta, classes,
      field, input, label,
    } = this.props;

    if (preview) {
      return (
        <Field
          style={{ width: '200px', marginTop: '0px' }}
          name={id}
          component={TextField}
          label={field.label}
        />
      );
    }
    return (
      <Fragment>
        <Row className={classes.inputRow}>
          <Column centerOnSmall>
            <TextboxForm
              name={input.name}
              onChange={(e, val) => this.parseUrl(val)}
              {...{ input, meta, label }}
            />
          </Column>
        </Row>
        <Row>
          <Column />
        </Row>
        <Row>
          <Column centerOnSmall>
            <iframe
              id='player'
              type='text/html'
              width='350'
              height='250'
              src={`http://www.youtube.com/embed/${this.state.videoId}`}
            />
          </Column>
        </Row>
      </Fragment>
    );
  }
}

export default withStyles(styles)(YouTubeLink);
