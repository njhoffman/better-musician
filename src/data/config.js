export default {
  auth: {
    routes: {
      apiUrl                : __API_URL__,
      signOutPath           : '/users/logout',
      emailSignInPath       : '/users/login',
      emailRegistrationPath : '/users/register',
      accountUpdatePath     : '/users/update',
      accountDeletePath     : '/users/delete',
      passwordResetPath     : '/users/password_reset',
      passwordUpdatePath    : '/users/password_update',
      tokenValidationPath   : '/users/validate_token',
      authProviderPaths     : {
        github   : '/users/login/github',
        facebook : '/users/login/facebook',
        google   : '/users/login/google_oauth2'
      }
    },
    settings: {
      serverSideRendering : false,
      clientOnly          : true
      // cleanSession:        true
    }
  },
  dev: {
    showPanel: true,
    showChart: true,
    logger: {
      level: 'trace',
      expandObjects: true,
      clearOnReload: true,
      levels: {},
      subsystems: {
        include: [],
        exclude: [],
        colors: []
      },
      actions: {
        include: [],
        exclude: [],
        colors: []
      }
    }
  }
};
