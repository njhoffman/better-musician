import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiThemeProvider, withStyles, Grid, Paper,
  Typography, Divider
} from '@material-ui/core';

import appConfig from 'config';
import processThemes from 'styles/themes';

const themes = processThemes(appConfig.themes);

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

class ComponentLayout extends React.Component {
  static defaultProps = {
    modifyInterval: 6000,
    modifyTimer: null
  };

  static propTypes = {
    children:       PropTypes.arrayOf(PropTypes.node).isRequired,
    classes:        PropTypes.instanceOf(Object).isRequired,
    modifyInterval: PropTypes.number,
    modifyTimer:    PropTypes.number
  }

  static containerStyle(theme) {
    return {
      background:   theme.palette.background.default,
      border:       `solid 1px ${theme.palette.divider}`,
      padding:      '10px',
      marginTop:    '15px',
      marginBottom: '15px'
    };
  }

  constructor(props) {
    super(props);
    const { modifyInterval } = props;
    this.state = {
      modifyInterval,
      modifyCount: 0,
      remainingTime: 0,
      modifyCounter: 0
    };
  }

  componentDidMount() {
    const { modifyTimer } = this.props;
    const { modifyInterval, modifyCount, remainingTime } = this.state;
    if (modifyTimer) {
      this.propModifyTimer = setInterval(() => {
        if (remainingTime <= 0) {
          this.setState({
            remainingTime: modifyInterval,
            modifyCount: modifyCount + 1
          });
          modifyTimer.call(this, modifyCount);
        } else {
          this.setState({ remainingTime: remainingTime - 1000 });
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.propModifyTimer);
  }

  renderThemeGroup(theme) {
    const { children, classes } = this.props;
    const { remainingTime, modifyCounter } = this.state;
    const cs = this.constructor.containerStyle;
    return (
      <MuiThemeProvider theme={theme}>
        <Paper style={cs(theme)}>
          <Typography variant='h3' style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            <span>{theme.themeName}</span>
            <span>
              {' ('}
              {theme.palette.type.replace(/^\w/, (c) => c.toUpperCase())}
              {') '}
            </span>
          </Typography>
          <Divider className={classes.divider} />
          {this.propModifyTimer && (
            <Typography variant='caption' style={titleStyle}>
              {'setting in '}
              {(remainingTime / 1000).toFixed(0)}
              {'s - #'}
              {modifyCounter}
            </Typography>
          )}
          {children.map((ComponentGroup, j) => ComponentGroup)}
        </Paper>
      </MuiThemeProvider>
    );
  }

  render() {
    return (
      <div>
        {Object.keys(themes).map(themeName => (
          <Grid container justify='space-around' key={themeName}>
            {Object.keys(themes[themeName]).map((key) => (
              <Grid item>
                {this.renderThemeGroup(themes[themeName][key])}
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(ComponentLayout);
