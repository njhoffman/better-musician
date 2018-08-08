import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';

import {
  MdClose as ResetIcon,
  MdSave as SaveIcon
} from 'react-icons/md';

import {
  Paper, Tabs, Tab, AppBar, Typography
} from '@material-ui/core';

import { updateUser } from 'store/api';
import Button from 'components/Button';
import FormField from 'components/Field';
import css from './SettingsView.scss';

export class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.hintMap = {
      default: 'Hover or select a field for additional information...',
      visualTheme: 'Select a color theme to apply to the whole application.',
      normalizePoints: 'Calculate point total based on highest difficulty ' +
      '(adding songs of higer difficulty reduces points totaled from lower difficulty songs).',
      maxDifficulty: 'The highest difficulty you anticipate assigning a song. ' +
      'This is automatically calculated if not set or existing songs exceed it.',
      maxProgress: 'The highest number you want to assign your progress on a song.'
    };
    this.state = {
      fieldHint: 'Hover or select a field for additional information...'
    };
  }

  showHint(fieldName) {
    this.setState({
      fieldHint: this.hintMap[fieldName] ? this.hintMap[fieldName] : this.hintMap['default']
    });
  }

  render() {
    let disabled = this.props.api ? this.props.api.isFetching : false;
    return (
      <Column small={12} medium={10} centerOnSmall large={8}>
        <Paper elevation={5}>
          <div className={css.settingsContainer}>
            <AppBar position='static'>
              <Tabs
                centered={true}
                fullWidth={true}
                onChange={(e, value) => this.props.history.push(value)}
                value='profile'>
                <Tab data-route='/profile' value='profile' label='Profile' />
                <Tab data-route='/stats' value='stats' label='Stats' />
                <Tab data-route='/settings' value='settings' label='Settings' />
                <Tab data-route='/fields' value='fields' label='Fields' />
              </Tabs>
            </AppBar>
            <form className={css.settingsForm}>
              <Typography>Update Your Settings</Typography>
              <Row className={css.fieldHint}>
                <Column>
                  {this.state.fieldHint}
                </Column>
              </Row>
              <Row>
                <FormField
                  name='visualTheme'
                  onTouchTap={() => this.showHint('visualTheme')}
                  style={{ width: '200px' }}
                  dataSource={{
                    'deepRed-dark': 'Deep Red (Dark)',
                    'steelBlue-dark' : 'Steel Blue (Dark)',
                    'blue-light' : 'Blue (Light)'
                  }}
                  onChange={this.props.setTheme}
                  type='select'
                  label='Visual Theme' />
                <FormField
                  name='normalizePoints'
                  onTouchTap={() => this.showHint('normalizePoints')}
                  type='checkbox'
                  label='Normalize Points' />
              </Row>
              <Row>
                <FormField
                  name='maxDifficulty'
                  onTouchTap={() => this.showHint('maxDifficulty')}
                  type='number'
                  label='Max Difficulty' />
                <FormField
                  name='maxProgress'
                  onTouchTap={() => this.showHint(this, 'maxProgress')}
                  type='number'
                  label='Max Progress' />
              </Row>
              <Row>
                <FormField
                  name='songBrushUpInterval'
                  type='number'
                  label='Brush Up Interval' />
                <FormField
                  name='songBrushUpDuration'
                  type='number'
                  label='Brush Up Duration' />
              </Row>
              <Row className={css.emailCheckboxes}>
                <FormField
                  name='songGoalEmail'
                  type='checkbox'
                  label='Receive Goal Notifications' />
                <FormField
                  name='songBrushUpEmail'
                  type='checkbox'
                  label='Receive Brush Up Notifications' />
              </Row>
              <Row className={css.buttonWrapper}>
                <Column>
                  <Button
                    type='submit'
                    label='Reset'
                    secondary
                    loading={disabled}
                    labelStyle={{ paddingRight: '5px' }}
                    style={{ width: '160px', marginRight: '15px' }}
                    onClick={this.props.resetSettings}
                    icon={<ResetIcon style={{ marginTop: '-10px' }} />}
                    className='update-profile-submit'
                    disabled={disabled} />
                  <Button
                    type='submit'
                    label='Save'
                    loading={disabled}
                    labelStyle={{ paddingRight: '5px' }}
                    style={{ width: '160px', marginRight: '15px' }}
                    onClick={this.props.updateSettings}
                    icon={<SaveIcon style={{ marginTop: '-10px' }} />}
                    className='update-profile-submit'
                    disabled={disabled}
                    primary />
                </Column>
              </Row>
            </form>
          </div>
        </Paper>
      </Column>
    );
  }
}

SettingsView.propTypes = {
  api:            PropTypes.object,
  history:        PropTypes.object.isRequired,
  setTheme:       PropTypes.func,
  updateSettings: PropTypes.func.isRequired,
  resetSettings:  PropTypes.func.isRequired
};


const setTheme = (theme) => (dispatch, getState) => {
  const user = getState().user;
  if (user) {
    const attrs = user.attributes;
    attrs.visualTheme = theme;
    dispatch({ type: 'AUTHENTICATE_COMPLETE', user: attrs });
  }
};

const mapActionCreators = {
  resetSettings:  updateUser,
  updateSettings: updateUser,
  setTheme:       setTheme
};

const mapStateToProps = (state) => ({
  api:           state.api,
  initialValues: state.user.attributes,
  settings:      state.user.attributes
});

const updateSettingsForm = reduxForm({ form: 'updateSettingsForm' })(SettingsView);
export default withRouter(connect(mapStateToProps, mapActionCreators)(updateSettingsForm));
