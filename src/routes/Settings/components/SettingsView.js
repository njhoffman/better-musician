import React, { Component } from 'react';
import { Paper, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import {
  MdClose as ResetIcon,
  MdSave as SaveIcon
} from 'react-icons/lib/md';
import muiThemeable from 'material-ui/styles/muiThemeable';

import  ButtonLoader from 'components/ButtonLoader';
import {
  RenderSelectField,
  RenderTextField,
  RenderNumberField,
  RenderCheckbox,
  RenderSliderField
} from 'components/Field';
import css from './SettingsView.scss';


class SettingsView extends Component {

  constructor(props) {
    super(props);
    this.hintMap = {
      default: 'Hover or select a field for additional information...',
      visualTheme: 'Select a color theme to apply to the whole application.',
      normalizePoints: 'Calculate point total based on highest difficulty (adding songs of higer difficulty reduces points totaled from lower difficulty songs).',
      maxDifficulty: 'The highest difficulty you anticipate assigning a song. This is automatically calculated if not set or existing songs exceed it.',
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
    const redirectFields = () => browserHistory.push('/fields');
    const textColor = this.props.muiTheme.palette.textColor;
    let disabled = this.props.api.isFetching;
    return (
      <Column small={8} centerOnSmall={true}>
        <Paper zDepth={5}>
          <div className={css.settingsContainer}>
            <Tabs value="settings">
              <Tab
                data-route="/profile"
                value="profile"
                onActive={redirectProfile}
                label="Profile">
              </Tab>
              <Tab
                data-route="/settings"
                value="settings"
                label="Settings">
                <form
                  className={css.settingsForm}>
                  <h3>Update Your Settings</h3>
                  <div className={css.fieldHint}>
                    {this.state.fieldHint}
                  </div>
                  <div className={css.flexRow}>
                    <div className={css.flexTwo}>
                      <Field
                        name="visualTheme"
                        onTouchTap={this.showHint.bind(this, 'visualTheme')}
                        dataSource={{ dark: 'Dark', light: 'Light' }}
                        component={RenderSelectField}
                        label="Visual Theme" />
                    </div>
                    <div className={css.flexTwo}>
                      <Field
                        name="normalizePoints"
                        onTouchTap={this.showHint.bind(this, 'normalizePoints')}
                        component={RenderCheckbox}
                        label="Normalize Points" />
                    </div>
                  </div>
                  <div className={css.flexRow}>
                    <div className={css.flexTwo}>
                      <Field
                        name="maxDifficulty"
                        onTouchTap={this.showHint.bind(this, 'maxDifficulty')}
                        component={RenderNumberField}
                        label="Max Difficulty" />
                    </div>
                    <div className={css.flexTwo}>
                      <Field
                        name="maxProgress"
                        onTouchTap={this.showHint.bind(this, 'maxProgress')}
                        component={RenderNumberField}
                        label="Max Progress" />
                    </div>
                  </div>
                  <div className={css.flexRow}>
                    <div className={css.flexTwo}>
                      <Field
                        name="songBrushUpInterval"
                        component={RenderNumberField}
                        label="Brush Up Interval" />
                    </div>
                    <div className={css.flexTwo}>
                      <Field
                        name="songBrushUpDuration"
                        component={RenderNumberField}
                        label="Brush Up Duration" />
                    </div>
                  </div>
                  <div className={css.flexRow}>
                    <div className={css.flexTwo}>
                      <Field
                        name="songGoalEmail"
                        component={RenderCheckbox}
                        label="Receive Future Goal Email Notifications" />
                    </div>
                    <div className={css.flexTwo}>
                      <Field
                        name="songBrushUpEmail"
                        component={RenderCheckbox}
                        label="Receive Brush Up Email Notifications" />
                    </div>
                  </div>
                  <div className={css.flexRow + ' ' + css.buttonWrapper}>
                    <div className={css.flexOne}>
                      <ButtonLoader
                        type="submit"
                        label="Reset"
                        loading={this.props.api.isFetching}
                        labelStyle={{ color: textColor, paddingRight: '5px' }}
                        style={{ width: '160px', marginRight: '15px' }}
                        onClick={this.props.resetSettings}
                        icon={<ResetIcon style={{ marginTop: '-10px', color: textColor }} />}
                        className='update-profile-submit'
                        disabled={disabled} >
                      </ButtonLoader>
                      <ButtonLoader
                        type="submit"
                        label="Save"
                        loading={this.props.api.isFetching}
                        labelStyle={{ color: textColor, paddingRight: '5px' }}
                        style={{ width: '160px', marginRight: '15px' }}
                        onClick={this.props.updateSettings}
                        icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
                        className='update-profile-submit'
                        disabled={disabled}
                        primary={true}>
                      </ButtonLoader>
                    </div>
                  </div>
                </form>
              </Tab>
              <Tab
                data-route="/fields"
                value="fields"
                onActive={redirectFields}
                label="Fields">
                <Link to='/fields' />
              </Tab>
            </Tabs>
          </div>
        </Paper>
      </Column>
    );
  }
};
const updateSettingsForm = reduxForm({ form: 'updateSettingsForm' })(muiThemeable()(SettingsView));
export default updateSettingsForm;
