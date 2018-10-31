import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ComponentLayout from 'components/DevTools/Cosmos/ComponentLayout';
import Button from 'components/Button';
import buttonGroups from './ButtonTypes.props';

const titleStyle = {
  width: '100%',
  textAlign: 'center',
  opacity: 0.8,
  marginTop: '10px'
};

export default {
  namespace: 'Buttons',
  name: 'Types',
  url: '/',
  component: ComponentLayout,
  children: buttonGroups
    .map((bg, bgIdx) => {
      const propIds = bg.props.map((bgp, idx) => ({ ...bgp, idx }));
      return { ...bg, idx: bgIdx, props: propIds };
    })
    .map((buttonGroup) => (
      <Grid item key={buttonGroup.idx}>
        <Typography variant='body2' style={titleStyle}>
          {buttonGroup.title}
        </Typography>
        <Grid container spacing={16} justify='center'>
          {buttonGroup.props.map((propGroup) => (
            <Grid item key={propGroup.idx}>
              <Button {...propGroup} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    ))
};
