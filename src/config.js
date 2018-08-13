import { defaultsDeep } from 'lodash';
import defaultConfig from 'config.default';

const userConfig = {
  endpoints:   {
    default: {
      logout: '/users/logout',
      login: '/users/login',
      register: '/users/register',
      userUpdate: '/users/update',
      userDelete: '/users/delete',
      passwordReset: '/users/password_reset',
      passwordUpdate: '/users/password_update',
      validateToken: '/users/validate_token',
      loginProviders: {
        github: '/users/login/github',
        facebook: '/users/login/facebook'
      }
      // signOutPath           : '/users/logout',
      // emailSignInPath       : '/users/login',
      // emailRegistrationPath : '/users/register',
      // accountUpdatePath     : '/users/update',
      // accountDeletePath     : '/users/delete',
      // passwordResetPath     : '/users/password_reset',
      // passwordUpdatePath    : '/users/password_update',
      // tokenValidationPath   : '/users/validate_token',
      // songsPath             : '/songs/',
      // authProviderPaths     : {
      //   github   : '/users/login/github',
      //   facebook : '/users/login/facebook',
      //   google   : '/users/login/google_oauth2'
      // },
    },
    admin: {
      listModels : '/admin/list/models',
      listAll :    '/admin/list/all'
    }
  },
  settings: {},
  dev: {
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
