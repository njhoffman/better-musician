import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';

import ComponentLayout from 'utils/dev/ComponentLayout';
import buttonGroups from './ButtonLoader.props.js';
import Button from 'components/Button';


const titleWrapperStyle = {
  width: '100%',
  textAlign: 'center'
};
const titleStyle = {
  opacity: 0.8,
  marginTop: '10px',
  display: 'inline-block',
  marginLeft: '5px'
};


const propOverride = { loading: false };
let modifyCounter = 0;
const handleLoadStatus = function(count) {
  propOverride.loading = !propOverride.loading;
  this.setState({ modifyCounter:  count });
};

const drawChild = (buttonGroup) => (
  <Grid item>
    <Typography variant='body2' style={titleStyle}>
      {buttonGroup.title}
    </Typography>
    <Grid container justify="center" spacing={16}>
      {buttonGroup.props.map((propGroup, i) => (
        <Grid item>
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
  children: buttonGroups.map(drawChild)
};

export default ButtonLoader;
