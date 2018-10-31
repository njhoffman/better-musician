import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ComponentLayout from 'components/DevTools/Cosmos/ComponentLayout';
import TextField from '@material-ui/core/TextField';
import textGroups from './TextField.props';

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
  children: textGroups
    .map((tg, tgIdx) => {
      const propIds = tg.props.map((tgp, idx) => ({ ...tgp, idx }));
      return { ...tg, idx: tgIdx, props: propIds };
    })
    .map((textGroup) => (
      <Grid item key={textGroup.idx}>
        <Typography variant='body2' style={titleStyle}>
          {textGroup.title}
        </Typography>
        <Grid container spacing={16} justify='center'>
          {textGroup.props.map((propGroup) => (
            <Grid item key={propGroup.idx}>
              <TextField {...propGroup} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    ))
};
