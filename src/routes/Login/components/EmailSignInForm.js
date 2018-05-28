import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Column } from 'react-foundation';
import withTheme from 'material-ui/styles/withTheme';

import { Divider } from 'material-ui';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ButtonLoader from 'components/ButtonLoader';
import FormField from 'components/Field';
import { emailSignIn } from 'routes/../actions/emailSignIn';

export class EmailSignInForm extends React.Component {
  static propTypes = {
    auth:        PropTypes.object,
    dispatch:    PropTypes.func.isRequired,
    endpoint:    PropTypes.string,
    next:        PropTypes.func.isRequired,
    emailSignIn: PropTypes.func.isRequired,
    loginForm:   PropTypes.object,
    inputProps:  PropTypes.shape({
      email:     PropTypes.object,
      password:  PropTypes.object,
      submit:    PropTypes.object
    })
  };

  static defaultProps = {
    next: () => {},
    inputProps: {
      email: {},
      password: {},
      submit: {}
    }
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEndpoint() {
    return (
      this.props.endpoint ||
      this.props.config.auth.currentEndpointKey ||
      this.props.config.auth.defaultEndpointkey
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = this.props.loginForm.values;
    this.props.dispatch(this.props.emailSignIn(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render() {
    let disabled = (this.props.isSignedIn || this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'loading']));

    const errors = this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'errors']);

    return (
      <form className='redux-auth email-sign-in-form'
        style={{ clear: 'both', overflow: 'hidden' }}
        onSubmit={this.handleSubmit}>
        <Row>
          <Column>
            {errors && [].concat(errors).map((error, i) =>
              <p key={i} className='error'>{error}</p>
            )}
          </Column>
        </Row>
        <Row>
          <FormField
            type='text'
            label='Email'
            name='email-sign-in-email'
            className='email-sign-in-email'
            ref='emailSignInEmail'
            disabled={disabled}
            {...this.props.inputProps.email} />
        </Row>
        <Row>
          <FormField
            type='text'
            label='Password'
            name='email-sign-in-password'
            className='email-sign-in-password'
            disabled={disabled}
            {...this.props.inputProps.password} />

          <Divider />
        </Row>
        <Row>
          <Column centerOnSmall>
            <ButtonLoader
              type='submit'
              className='email-sign-in-submit'
              disabled={disabled}
              label='Sign In'
              icon={<ExitToAppIcon />}
              onClick={this.handleSubmit}
              primary
              {...this.props.inputProps.submit} />
          </Column>
        </Row>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config:      state.config,
    auth:        state.auth,
    isSignedIn:  state.user.isSignedIn,
    loginForm:   state.form.login,
    emailSignIn: emailSignIn
  };
};

export default connect(mapStateToProps)(withTheme()(reduxForm({ form: 'login' })(EmailSignInForm)));
