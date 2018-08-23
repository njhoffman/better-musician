import { defaultsDeep } from 'lodash';
import defaultConfig from 'config.default';

const userConfig = {
  endpoints:   {
    default: {
      auth: {
        logout:        '/users/logout',
        login:         '/users/login',
        register:      '/users/register',
        passwordReset: '/users/password_reset',
        validateToken: '/users/validate_token',
        providers: {
          github:      '/users/login/github',
          facebook:    '/users/login/facebook',
          google:      '/users/login/google_oauth2'
        }
      },
      help: {
        contactEmail:   '/contact/email',
        contactLive:    '/contact/live'
      }
    },
    user: {
      update:          '/users/update',
      delete:          '/users/delete',
      updatePassword:  '/users/password_update',
    },
    admin: {
      extends:         'user',
      listModels:      '/admin/list/models',
      listAll:         '/admin/list/all'
    }
  },
  settings: {},
  dev: {
    showPanel: true,
    showChart: false,
    extensionOptions: {
      name: 'instrumental',
      // actionsBlacklist: ['@@redux-form/REGISTER_FIELD', '@@redux-form/UNREGISTER_FIELD'],
      theme: 'twilight'
    },
    inspector: {
      actions: {
        exclude: [ ],
        style: { }
      }
    },
    chart: {
      actions: {
        exclude: [
          '@@redux-form/BLUR',
          '@@redux-form/FOCUS'
        ],
        style: {
          'CONFIGURE_COMPLETE':            { color: '#88eeaa' },
          'EMAIL_SIGN_IN_ERROR':           { color: 'red', border: 'solid 1px #660000' },
          'EMAIL_SIGN_IN_START':           { color: 'rgba(200, 255, 255, 1)' },
          'EMAIL_SIGN_IN_SUCCESS':         { color: '#00ffaa' },
          '@@redux-form/REGISTER_FIELD':   { color: '#838383' },
          '@@redux-form/UNREGISTER_FIELD': { color: '#838383' },
        }
      }
    }
  }
};

export default defaultsDeep(userConfig, defaultConfig);

      // signOutPath           : '/users/logout',
      // emailSignInPath       : '/users/login',
      // emailRegistrationPath : '/users/register',
      // accountUpdatePath     : '/users/update',
      // accountDeletePath     : '/users/delete',
      // passwordResetPath     : '/users/password_reset',
      // passwordUpdatePath    : '/users/password_update',
      // tokenValidationPath   : '/users/validate_token',
      // authProviderPaths     : {
      //   github   : '/users/login/github',
      //   facebook : '/users/login/facebook',
      //   google   : '/users/login/google_oauth2'
      // },
