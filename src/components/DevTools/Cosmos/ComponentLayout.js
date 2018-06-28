import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { chunk } from 'lodash';

import themes from 'styles/themes';

const styles = {
  divider: {
    width: '30%',
    margin: '5px auto 10px auto'
  }
};

const titleStyle = {
  textAlign: 'center',
  opacity: 0.8
};

export class ComponentLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    timerProp: PropTypes.bool,
    modifyCounter: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      modifyInterval: props.modifyTimerInterval || 6000,
      modifyCount: 0,
      remainingTime: 0,
      modifyCounter: 0
    };
  }

  componentDidMount() {
    if (this.props.modifyTimer) {
      this.propModifyTimer = setInterval(() => {
        if (this.state.remainingTime <= 0) {
          this.setState({
            remainingTime: this.state.modifyInterval,
            modifyCount: ++this.state.modifyCount
          });
          this.props.modifyTimer.call(this, this.state.modifyCount);
        } else {
          this.setState({ remainingTime: this.state.remainingTime - 1000 });
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.propModifyTimer);
  }

  containerStyle(theme) {
    return {
      background:   theme.palette.background.default,
      border:       `solid 1px ${theme.palette.divider}`,
      padding:      '10px',
      marginTop:    '15px',
      marginBottom: '15px'
    };
  }

  renderThemeGroup(theme) {
    const { children, classes } = this.props;
    const cs = this.containerStyle;
    return (
      <MuiThemeProvider theme={theme}>
        <Paper style={cs(theme)}>
          <Typography variant='subheading' style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            {theme.themeName} ({theme.palette.type.replace(/^\w/, (c) => c.toUpperCase())})
          </Typography>
          <Divider className={classes.divider} />
          {this.propModifyTimer && (
            <Typography variant='caption' style={titleStyle}>
              (setting in {(this.state.remainingTime / 1000).toFixed(0)}s - #{this.state.modifyCounter})
            </Typography>
          )}
          {children.map((ComponentGroup, j) => ComponentGroup)}
        </Paper>
      </MuiThemeProvider>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        {chunk(Object.keys(themes), 2).map((key, i) => (
          <Grid container justify='space-around' key={i}>
            <Grid item >
              {this.renderThemeGroup(themes[key[0]])}
            </Grid>
            <Grid item >
              {this.renderThemeGroup(themes[key[1]])}
            </Grid>
          </Grid>
        ))}
      </div>
    );
  }
};

export default withStyles(styles)(ComponentLayout);
