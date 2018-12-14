import { inputText } from 'actions/dev';

export default {
  name: 'LogIn-Email Fail (Sync)',
  actions: [
    ...inputText('login', 'email-sign-in-email', 'bademail@bademail.com', 100),
    ...inputText('login', 'email-sign-in-password', 'noaccount', 100), {
      type: 'AUTH_CURRENT_ENDPOINT_KEY',
      payload: 'default'
    }, {
      type: 'AUTH_EMAIL_SIGN_IN_START'
    }, {
      type: 'AUTH_CURRENT_ENDPOINT_KEY',
      payload: 'default'
    }, {
      type: 'AUTH_EMAIL_SIGN_IN_ERROR',
      payload: {
        errors: {
          status: 401,
          message: 'Incorrect username or password',
          title: 'Login Error',
          success: false
        }
      },
      meta: {
        endpoint: 'default'
      }
    }
  ]
};
