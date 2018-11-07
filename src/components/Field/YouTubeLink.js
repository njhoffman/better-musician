import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Column } from 'react-foundation';
import { InputLabel, FormLabel, withStyles } from '@material-ui/core';
import { get } from 'lodash';
import TextboxField from './Textbox';

const styles = (theme) => ({
  inputRow: {
    marginBottom: '20px'
  },
  fieldLabel: {
    textAlign: 'center',
    width: '100%',
    display: 'block'
  },
  prefixWrapper: {
    padding: '0px',
    lineHeight: '2.0em'
  },
  prefix: {
    fontSize: '0.7em',
    color: theme.palette.secondary.main
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
    const { preview, id, meta, classes, input, label } = this.props;
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
          <Column small={5}>
            <TextboxField
              name={input.name}
              onChange={(e, val) => this.parseUrl(val)}
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
              height='250'
              src={`http://www.youtube.com/embed/${videoId}`}
            />
          </Column>
        </Row>
      </Fragment>
    );
  }
}

export default withStyles(styles)(YouTubeLink);
