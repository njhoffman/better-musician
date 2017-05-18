const loginCommands = {
  login(email, pass) {
    return this
      .waitForElementVisible('@emailInput')
      .setValue('@emailInput', email)
      .setValue('@passInput', pass)
      .waitForElementVisible('@loginButton')
      .click('@loginButton')
  }
};

export default {
  url: 'http://localhost:3000/login',
  commands: [loginCommands],
  elements: {
    emailInput: {
      selector: '.email-sign-in-email input'
    },
    passInput: {
      selector: '.email-sign-in-password input'
    },
    loginButton: {
      selector: '.email-sign-in-submit button'
    },
    errorMessage: {
      selector: '.email-sign-in-form p.error'
    }
  }
};
