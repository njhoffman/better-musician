import { inputText } from 'actions/dev';

export default {
  name: 'LogIn-Email Fail (Async)',
  actions: [
    ...inputText('login', 'email-sign-in-email', 'mother fucker', 500)
  ]
};
