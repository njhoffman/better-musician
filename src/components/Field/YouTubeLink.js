import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { get } from 'lodash';
import {
  InputLabel,
  FormControl,
  FormLabel,
  TextField as MaterialTextField,
  withStyles
} from '@material-ui/core';

import { FIELD_VIEW, FIELD_VIEW_ALT } from 'constants/ui';
import { ConnectedTextbox } from './Textbox';

const styles = (theme) => ({
  outlined: {
    border: 'solid 1px rgba(255, 255, 255, 0.23)',
    borderRadius: '5px',
    padding: '10px'
  },
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
    position: 'relative',
    lineHeight: '2.0em',
    textAlign: 'right'
  },
  prefix: {
    fontSize: '0.7em',
    color: theme.palette.secondary.main,
    position: 'relative',
    top: '1.25em',
    marginRight: '5px'
  }
});

const youtubeRE = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/;

const createYouTubeLink = (TextComponent) => (
  class YouTubeLink extends Component {
    static defaultProps = {
      initialValues: null,
      style: {},
      id: null
    };

    static propTypes = {
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
      const { mode, id, meta, classes, input, label } = this.props;
      const textboxLabel = 'Video ID';

      const { videoId } = this.state;
      return (
        <FormControl
          component='fieldset'
          fullWidth
          className={mode === FIELD_VIEW_ALT ? classes.outlined : ''}>
          <FormLabel component='legend'>{label}</FormLabel>
          <Row className={classes.inputRow}>
            <Column small={12} className={classes.prefixWrapper}>
              <InputLabel className={classes.prefix}>
                http://www.youtube.com/embed/
              </InputLabel>
              <TextComponent
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
        </FormControl>
      );
    }
  }
);

const ConnectedYouTubeLink = withStyles(styles)(createYouTubeLink(ConnectedTextbox));
const YouTubeLink = withStyles(styles)(createYouTubeLink(MaterialTextField));

export { YouTubeLink as default, ConnectedYouTubeLink };
