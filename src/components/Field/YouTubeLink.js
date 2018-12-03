import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Column } from 'react-foundation';
import { InputLabel, FormLabel, withStyles } from '@material-ui/core';
import { get } from 'lodash';
import { FIELD_VIEW, FIELD_VIEW_ALT } from 'constants/ui';
import TextboxField from './Textbox';

const styles = (theme) => ({
  inputRow: {
    marginBottom: '5px'
  },
  inputWrapper: {
    textAlign: 'left'
  },
  input: {
    width: '8em'
  },
  fieldLabel: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
    marginTop: '-5px',
    display: 'block'
  },
  prefixWrapper: {
    padding: '0px',
    lineHeight: '2.0em',
    textAlign: 'right'
  },
  prefix: {
    fontSize: '0.7em',
    color: theme.palette.secondary.main,
    display: 'block'
  }
});

const youtubeRE = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/;

class YouTubeLink extends Component {
  static defaultProps = {
    preview: false,
    initialValues: null,
    style: {},
    id: null
  };

  static propTypes = {
    preview       : PropTypes.bool,
    initialValues : PropTypes.instanceOf(Object),
    style         : PropTypes.instanceOf(Object),
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
    const { preview, mode, id, meta, classes, input, label } = this.props;
    const textboxLabel = 'Video ID';

    if (preview) {
      return (
        <Field
          style={{ width: '200px', marginTop: '0px' }}
          name={id}
          fullWidth={false}
          component={TextboxField}
          label={label}
        />
      );
    }
    const { videoId } = this.state;
    return (
      <Fragment>
        <Row className={classes.inputRow}>
          <Column small={7} className={classes.prefixWrapper}>
            <FormLabel className={classes.fieldLabel}>
              {label}
            </FormLabel>
            <InputLabel className={classes.prefix}>
              http://www.youtube.com/embed/
            </InputLabel>
          </Column>
          <Column small={5} className={classes.inputWrapper}>
            <TextboxField
              name={input.name}
              className={classes.input}
              onChange={(e, val) => this.parseUrl(val)}
              InputProps={{
                readOnly: mode === FIELD_VIEW || mode === FIELD_VIEW_ALT
              }}
              label={textboxLabel}
              {...{ input, meta }}
            />
          </Column>
        </Row>
        <Row>
          <Column centerOnSmall>
            <iframe
              id='player'
              title={id}
              type='text/html'
              width='350'
              src={`http://www.youtube.com/embed/${videoId}`}
            />
          </Column>
        </Row>
      </Fragment>
    );
  }
}

export default withStyles(styles)(YouTubeLink);
