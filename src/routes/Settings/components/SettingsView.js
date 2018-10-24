import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import { MdClose as ResetIcon, MdSave as SaveIcon } from 'react-icons/md';
import { Paper, Tabs, Tab, AppBar, Typography, Divider, withStyles } from '@material-ui/core';

import { updateSettings } from 'actions/api';
import Button from 'components/Button';
import FormField, { FormRow } from 'components/Field';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    }
  },
  form: {
    margin: '15px',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 5px',
      padding: '2px',
    }
  },
  buttonDivider: {
    marginTop: '5px',
    marginBottom: '10px'
  },
  buttonBar: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});
//
// visualTheme: 'Select a color theme to apply to the whole application.',
// normalizePoints: 'Calculate point total based on highest difficulty ' +
//    '(adding songs of higer difficulty reduces points totaled from lower difficulty songs).',
// maxDifficulty: 'The highest difficulty you anticipate assigning a song. ' +
//    'This is automatically calculated if not set or existing songs exceed it.',
// maxProgress: 'The highest number you want to assign your progress on a song.'

const SettingsView = ({
  history,
  classes,
  update,
  reset,
  formTouched,
  errors,
  setTheme,
  api: { isFetching },
  ...props
}) => {
  const disabled = isFetching || !formTouched || Boolean(errors);
  return (
    <Column className={classes.root} small={12} medium={10} centerOnSmall large={8}>
      <Paper elevation={5}>
        <AppBar position='static'>
          <Tabs value='settings' centered fullWidth onChange={(e, val) => history.push(val)}>
            <Tab data-route='/profile' value='profile' label='Profile' />
            <Tab data-route='/settings' value='settings' label='Settings' />
            <Tab data-route='/fields' value='fields' label='Fields' />
          </Tabs>
        </AppBar>
        <form className={classes.form}>
          <FormRow small={6}>
            <FormField
              name='visualTheme'
              options={{
                'crimsonRed.dark': 'Crimson Red (Dark)',
                'crimsonRed.light': 'Crimson Red (Light)',
                'steelBlue.dark' : 'Steel Blue (Dark)',
                'steelBlue.light' : 'Steel Blue (Light)',
                'blue-light' : 'Blue (Light)'
              }}
              onChange={setTheme}
              type='select'
              label='Visual Theme'
            />
            <FormField
              name='normalizePoints'
              type='checkbox'
              label='Normalize Points'
            />
          </FormRow>
          <FormRow small={6}>
            <FormField
              name='maxDifficulty'
              type='number'
              label='Max Difficulty'
            />
            <FormField
              name='maxProgress'
              type='number'
              label='Max Progress'
            />
          </FormRow>
          <FormRow small={6}>
            <FormField
              name='songBrushUpInterval'
              type='number'
              unit='days'
              label='Brush Up Interval'
            />
            <FormField
              name='songBrushUpDuration'
              type='number'
              unit='days'
              label='Brush Up Duration'
            />
          </FormRow>
          <FormRow small={6}>
            <FormField
              name='songGoalEmail'
              type='checkbox'
              label='Receive Goal Notifications'
            />
            <FormField
              name='songBrushUpEmail'
              type='checkbox'
              label='Receive Brush Up Notifications'
            />
          </FormRow>
          <Divider className={classes.buttonDivider} />
          <FormRow small={10}>
            <Column className={classes.buttonBar}>
              <Button
                type='submit'
                label='Reset'
                secondary
                labelStyle={{ paddingRight: '5px' }}
                style={{ width: '100px', marginRight: '5px' }}
                onClick={reset}
                icon={<ResetIcon />}
                className='update-profile-submit'
                disabled={isFetching}
              />
              <Button
                type='submit'
                label='Save'
                loading={isFetching}
                labelStyle={{ paddingRight: '5px' }}
                style={{ width: '100px', marginLeft: '5px' }}
                onClick={update}
                icon={<SaveIcon />}
                className='update-profile-submit'
                disabled={disabled}
                primary
              />
            </Column>
          </FormRow>
        </form>
      </Paper>
    </Column>
  );
};

SettingsView.propTypes = {
  api:      PropTypes.object,
  history:  PropTypes.instanceOf(Object).isRequired,
  setTheme: PropTypes.func,
  update:   PropTypes.func.isRequired,
  reset:    PropTypes.func.isRequired,
  classes:  PropTypes.instanceOf(Object).isRequired
};


const setTheme = (theme) => (dispatch, getState) => {
  const user = getState().user;
  if (user) {
    const attrs = user.attributes;
    attrs.visualTheme = theme;
    // dispatch({ type: 'AUTHENTICATE_COMPLETE', user: attrs });
  }
};

const mapActionCreators = {
  reset:    updateSettings,
  update:   updateSettings,
  setTheme: setTheme
};

const mapStateToProps = (state) => ({
  api:           state.api,
  initialValues: state.user.attributes,
  settings:      state.user.attributes,
  formTouched:   state.form.updateSettingsForm && state.form.updateSettingsForm.anyTouched,
  errors:        state.form.updateSettingsForm && state.form.updateSettingsForm.syncErrors
});

const updateSettingsForm = reduxForm({ form: 'updateSettingsForm' })(withStyles(styles)(SettingsView));
export default withRouter(connect(mapStateToProps, mapActionCreators)(updateSettingsForm));
