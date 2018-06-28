import React from 'react';

import ViewLayout from 'components/DevTools/Cosmos/ViewLayout';
import Header from 'components/Header';

// const titleStyle = {
//   width: '100%',
//   textAlign: 'center',
//   marginTop: '10px',
//   fontVariant: 'small-caps'
// };

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
