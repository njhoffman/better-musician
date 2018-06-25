import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ViewLayout from 'utils/dev/ViewLayout';
import Header from 'components/Header';

const titleStyle = {
  width: '100%',
  textAlign: 'center',
  marginTop: '10px',
  fontVariant: 'small-caps'
};

export default {
  namespace: 'Header',
  name: 'SignedOut',
  component: ViewLayout,
  children: [ <Header /> ],
  reduxState: {},
  props: {
    isSignedIn: false
  },
  url: '/'
};
