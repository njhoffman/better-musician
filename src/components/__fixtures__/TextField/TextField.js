import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ComponentLayout from 'components/DevTools/Cosmos/ComponentLayout';
import textGroups from './TextField.props.js';
import TextField from '@material-ui/core/TextField';

const titleStyle = {
  width: '100%',
  textAlign: 'center',
  marginTop: '10px',
  fontVariant: 'small-caps'
};

export default {
  namespace: 'TextInput',
  name: 'Types',
  component: ComponentLayout,
  children: textGroups.map((textGroup, i) => (
    <Grid item key={i}>
      <Typography variant='body2' style={titleStyle}>
        {textGroup.title}
      </Typography>
      <Grid container spacing={16} justify='center'>
        {textGroup.props.map((propGroup, i) => (
          <Grid item key={i}>
            <TextField {...propGroup} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  ))
};
