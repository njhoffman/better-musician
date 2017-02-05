import React, { Component, PropTypes } from 'react';
import { Row, Column } from 'react-foundation';
import { RenderText } from '../Field';
import { Field, FieldArray } from 'redux-form';

let textInput = "";

const youtubeRE = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

class RenderCustomYouTubeLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: ''
    };
  }

  parseUrl(val) {
    const videoId = youtubeRE.test(val) ? val.match(youtubeRE)[1] : '';
    this.setState({ videoId });
    return val;
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
                style={{ ...this.props.style, ...{ width: '100%', textAlign: 'center', verticalAlign: 'middle' }}}
                name={this.props.field.name}
                onChange={(e, val) => this.parseUrl(val)}
                ref="youtubeLink"
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
            <Column>
            </Column>
          </Row>
          <Row>
            <Column centerOnSmall>
              <iframe id="player" type="text/html"
                width="350"
                height="250"
                src={'http://www.youtube.com/embed/' + this.state.videoId}>
              </iframe>
            </Column>
          </Row>
        </Column>
      );
    }
  };
}
// http://www.youtube.com/embed/M7lc1UVf&#45;VE?enablejsapi=1&#38;origin=http://www.example.com">
export default RenderCustomYouTubeLink;
