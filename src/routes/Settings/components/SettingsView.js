import React, { Component } from 'react';
import { Paper, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import {
  MdClose as ResetIcon,
  MdSave as SaveIcon
} from 'react-icons/lib/md';
import muiThemeable from 'material-ui/styles/muiThemeable';

import ButtonLoader from 'components/ButtonLoader';
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

  };

  showHint(fieldName) {
    this.setState({
      fieldHint: this.hintMap[fieldName] ? this.hintMap[fieldName] : this.hintMap['default']
    });
  }

  render() {
    // const user = props.settings.get('attributes');
    // (
    //   this.props.auth.getIn(["user", "isSignedIn"]) ||
    //   this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
    // );
    const redirectProfile = () => browserHistory.push('/profile');
    const redirectStats = () => browserHistory.push('/stats');
    const redirectFields = () => browserHistory.push('/fields');
    const textColor = this.props.muiTheme ? this.props.muiTheme.palette.textColor : 'black';
    let disabled = this.props.api ? this.props.api.isFetching : false;
    return (
      <Column small={12} medium={10} centerOnSmall large={8}>
        <Paper zDepth={5}>
          <div className={css.settingsContainer}>
            <Tabs value='settings'>
              <Tab
                data-route='/profile'
                value='profile'
                onActive={redirectProfile}
                label='Profile' />
              <Tab
                data-route='/stats'
                value='stats'
                onActive={redirectStats}
                label='Stats' />
              <Tab
                data-route='/settings'
                value='settings'
                label='Settings'>
                <form className={css.settingsForm}>
                  <h3>Update Your Settings</h3>
                  <Row className={css.fieldHint}>
                    <Column>
                      {this.state.fieldHint}
                    </Column>
                  </Row>
                  <Row>
                    <FormField
                      name='visualTheme'
                      onTouchTap={this.showHint.bind(this, 'visualTheme')}
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
                      onTouchTap={this.showHint.bind(this, 'normalizePoints')}
                      type='checkbox'
                      label='Normalize Points' />
                  </Row>
                  <Row>
                    <FormField
                      name='maxDifficulty'
                      onTouchTap={this.showHint.bind(this, 'maxDifficulty')}
                      type='number'
                      label='Max Difficulty' />
                    <FormField
                      name='maxProgress'
                      onTouchTap={this.showHint.bind(this, 'maxProgress')}
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
                      <ButtonLoader
                        type='submit'
                        label='Reset'
                        secondary
                        loading={disabled}
                        labelStyle={{ paddingRight: '5px' }}
                        style={{ width: '160px', marginRight: '15px' }}
                        onClick={this.props.resetSettings}
                        icon={<ResetIcon style={{ marginTop: '-10px', color: textColor }} />}
                        className='update-profile-submit'
                        disabled={disabled} />
                      <ButtonLoader
                        type='submit'
                        label='Save'
                        loading={disabled}
                        labelStyle={{ color: textColor, paddingRight: '5px' }}
                        style={{ width: '160px', marginRight: '15px' }}
                        onClick={this.props.updateSettings}
                        icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
                        className='update-profile-submit'
                        disabled={disabled}
                        primary />
                    </Column>
                  </Row>
                </form>
              </Tab>
              <Tab
                data-route='/fields'
                value='fields'
                onActive={redirectFields}
                label='Fields' />
            </Tabs>
          </div>
        </Paper>
      </Column>
    );
  }
};

SettingsView.propTypes = {
  muiTheme:       React.PropTypes.object,
  api:            React.PropTypes.object,
  setTheme:       React.PropTypes.func,
  updateSettings: React.PropTypes.func,
  resetSettings:  React.PropTypes.func
};

const updateSettingsForm = reduxForm({ form: 'updateSettingsForm' })(muiThemeable()(SettingsView));
export default updateSettingsForm;
