export default {
  name: 'LogIn - Email',
  actions: [{
    type: 'UI_DRAWER_MENU_TOGGLE'
  }, {
    type: 'AUTH_SIGN_OUT_START',
    endpoint: 'default'
  }, {
    type: 'UI_SNACKBAR_SHOW',
    payload: 'You have successfully logged out of your account.',
    meta: {
      variant: 'success'
    }
  }, {
    type: 'AUTH_SIGN_OUT_COMPLETE',
    user: {
      status: 200,
      success: true,
      records: [
        {
          email: 'testuser@example.com',
          id: '30000000-0000-0000-0000-000000000000',
          roles: [
            'user',
            'admin'
          ],
          updatedAt: []
        }
      ]
    },
    endpoint: 'default'
  }, {
    type: '@@router/LOCATION_CHANGE',
    payload: {
      location: {
        pathname: '/login',
        hash: '',
        search: '?redirect=%2Fsongs',
        key: 'p4s8r1'
      },
      action: 'REPLACE'
    }
  }, {
    type: 'UI_INIT_VIEW_START',
    payload: 'Login'
  }, {
    type: 'UI_INIT_VIEW_COMPLETE',
    payload: 'Login',
    meta: {
      pathname: '/login'
    }
  }, {
    type: 'AUTH_CURRENT_ENDPOINT_KEY',
    payload: 'default'
  }, {
    type: 'UI_DRAWER_MENU_HIDE'
  }]
};
