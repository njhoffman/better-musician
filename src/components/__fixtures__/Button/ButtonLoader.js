import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';

import ComponentLayout from 'components/DevTools/Cosmos/ComponentLayout';
import Button from 'components/Button';
import buttonGroups from './ButtonLoader.props';

// const titleWrapperStyle = {
//   width: '100%',
//   textAlign: 'center'
// };

const titleStyle = {
  width: '100%',
  textAlign: 'center',
  opacity: 0.8,
  marginTop: '10px'
};

const propOverride = { loading: false };
const modifyCounter = 0;
const handleLoadStatus = function handleLoadStatus(count) {
  propOverride.loading = !propOverride.loading;
  this.setState({ modifyCounter:  count });
};

const drawChild = (buttonGroup) => (
  <Grid item>
    <Typography variant='body2' style={titleStyle}>
      {buttonGroup.title}
    </Typography>
    <Grid container justify='center' spacing={16}>
      {buttonGroup.props.map((propGroup, i) => (
        <Grid key={propGroup.idx} item>
          <Button {...propGroup} override={propOverride} />
        </Grid>
      ))}
    </Grid>
  </Grid>
);

const ButtonLoader = {
  namespace: 'Buttons',
  name: 'Loaders',
  component: ComponentLayout,
  props: {
    modifyTimer: handleLoadStatus
  },
  state: {
    modifyCounter
  },
  url: '/',
  children: buttonGroups
    .map((bg) => {
      // assign ids to props for stupid index keys
      const propIds = bg.props.map((bgp, idx) => ({ ...bgp, idx }));
      return ({ ...bg, props: propIds });
    })
    .map(drawChild)
};

export default ButtonLoader;
