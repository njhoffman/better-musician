import userMonitorProps from 'config/user/monitors';
import defaults from 'config/user/themes/defaults';
import crimsonRed from 'config/user/themes/crimsonRed';
import steelBlue from 'config/user/themes/steelBlue';

export default {
  themes: {
    defaults,
    crimsonRed,
    steelBlue
  },
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
      listModels:      '/admin/list/models',
      listAll:         '/admin/list/all'
    }
  },
  settings: {},
  dev: {
    showInspector: true,
    showChart: false,
    showToolbar: false,
    showExtension: false,
    monitorProps:  userMonitorProps,
    extensionOptions: {
      name: 'instrumental',
      theme: 'twilight',
      styles: {
        container: {
          backgroundColor: 'rgb(0, 11, 21)',
        },
        buttonBar: {
          backgroundColor: '#050b16',
          borderColor: '#1f2a35'
        }
      }
    },
    inspectorOptions: {
      hideMobile: true,
      actions: {
        exclude: [],
        style: { }
      }
    },
    chartOptions: {
      actions: {
        exclude: [
          '@@redux-form/BLUR',
          '@@redux-form/FOCUS'
        ],
        style: {
          CONFIGURE_COMPLETE:            { color: '#88eeaa' },
          EMAIL_SIGN_IN_ERROR:           { color: 'red', border: 'solid 1px #660000' },
          EMAIL_SIGN_IN_START:           { color: 'rgba(200, 255, 255, 1)' },
          EMAIL_SIGN_IN_SUCCESS:         { color: '#00ffaa' },
          '@@redux-form/REGISTER_FIELD':   { color: '#838383' },
          '@@redux-form/UNREGISTER_FIELD': { color: '#838383' },
        }
      }
    }
  }
};
