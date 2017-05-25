import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Column } from 'react-foundation';
import { RenderText } from '../Field';
import { Field } from 'redux-form';

const youtubeRE = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/;

class RenderCustomYouTubeLink extends Component {
  static propTypes = {
    disabled      : PropTypes.bool,
    preview       : PropTypes.string,
    initialValues : PropTypes.object,
    field         : PropTypes.object.isRequired,
    inputStyle    : PropTypes.object,
    labelStyle    : PropTypes.object,
    style         : PropTypes.object,
    id            : PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      videoId: this.parseUrl(get(this.props.initialValues, this.props.field.name))
    };
  }

  parseUrl(val) {
    const videoId = youtubeRE.test(val) ? val.match(youtubeRE)[1] : val;
    this.setState({ videoId });
    return videoId;
  }

  render() {
    if (this.props.preview) {
      return (
        <Field
          style={{ width: '200px', marginTop: '0px' }}
          name={this.props.id}
          component={RenderText}
          label={this.props.field.label} />
      );
    } else {
      return (
        <Column>
          <Row>
            <Column centerOnSmall>
              <Field
                style={{ ...this.props.style, ...{ width: '100%', textAlign: 'center', verticalAlign: 'middle' } }}
                name={this.props.field.name}
                onChange={(e, val) => this.parseUrl(val)}
                inputStyle={this.props.inputStyle}
                disabled={this.props.disabled}
                underlineShow={!this.props.disabled}
                floatingLabelStyle={{ ...this.props.labelStyle, ...{ left: '25px', textAlign: 'center' } }}
                component={RenderText}
                label={this.props.field.label}
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
  };
}

export default RenderCustomYouTubeLink;
