import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import { MdClose as ResetIcon, MdSave as SaveIcon } from 'react-icons/md';
import { Paper, Tabs, Tab, AppBar, Divider, withStyles } from '@material-ui/core';

import validate from 'utils/validate';
import { updateSettings } from 'actions/api';
import { changedFields } from 'selectors/form';
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
  changed,
  classes,
  update,
  reset,
  isFetching,
  errors,
  syncErrors,
  setTheme,
  ...props
}) => {
  const disabled = isFetching
    || Object.keys(changed).length === 0
    || Object.keys(syncErrors).length > 0;
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
                disabled={disabled}
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

SettingsView.defaultProps = {
  isTouched: false,
  errors: [],
  syncErrors: {},
  isFetching: false
};

SettingsView.propTypes = {
  changed:     PropTypes.instanceOf(Object).isRequired,
  history:     PropTypes.instanceOf(Object).isRequired,
  setTheme:    PropTypes.func.isRequired,
  update:      PropTypes.func.isRequired,
  reset:       PropTypes.func.isRequired,
  classes:     PropTypes.instanceOf(Object).isRequired,
  isTouched:   PropTypes.bool,
  isFetching:  PropTypes.bool,
  syncErrors:  PropTypes.instanceOf(Object),
  errors:      PropTypes.arrayOf(PropTypes.object)
};

const setTheme = (theme) => (dispatch, getState) => {
  const { user } = getState();
  if (user) {
    const attrs = user.attributes;
    attrs.visualTheme = theme;
    // dispatch({ type: 'AUTHENTICATE_COMPLETE', user: attrs });
  }
};

const mapActionCreators = {
  reset:    updateSettings,
  update:   updateSettings,
  setTheme
};

const mapStateToProps = (state) => ({
  changed:       changedFields(state.form.profile),
  initialValues: _.get(state, 'user.attributes'),
  settings:      _.get(state, 'user.attributes'),
  isTouched:     _.get(state, 'form.settings.anyTouched'),
  syncErrors:    _.get(state, 'form.settings.syncErrors'),
  isFetching:    _.get(state, 'api.user.update.loading'),
  errors:        _.get(state, 'api.user.update.errors')
});

const validateFields = {
  maxProgress:         [
    ['isNumeric', 'Must Be Numeric']
  ],
  maxDifficulty:       [
    ['isNumeric', 'Must Be Numeric']
  ],
  songBrushUpInterval: [
    ['isNumeric', 'Must Be Numeric']
  ]
};

const settingsForm = reduxForm({
  form: 'settings',
  validate: validate(validateFields)
})(withStyles(styles)(SettingsView));

export default withRouter(connect(mapStateToProps, mapActionCreators)(settingsForm));
