import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import {
  AppBar, Divider, Paper, Tabs, Tab, withStyles
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/PlaylistAdd';
import { changedFields } from 'selectors/form';
import validate from 'utils/validate';
import Button from 'components/Button';
import FormField, { FormRow } from 'components/Field';
import { cancelTabEdit } from 'routes/Fields/modules/actions';
import { userTabs as userTabsSelector } from 'routes/Fields/modules/selectors';
import PreviewModal from './PreviewModal';
import EditModal from './EditModal';
import FieldTab from './FieldTab';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    }
  },
  form: {
    margin: '15px 15px 0px 15px',
    padding: '5px 5px 0px 5px',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 5px 0x 5px',
      padding: '2px 2px 0px 2px',
    }
  },
  addTabRow: {
    alignItems: 'center'
  },
  addTabTextWrapper: {
    flex: 'none',
    width: 'auto'
  },
  updateTabButton: {
  },
  updateTabButtonDisabed: {
    opacity: 0.2
  },
  cancelTabButton: {
    marginLeft: '5px',
    minWidth: '48px',
    minHeight: '24px',
    padding: '4px 5px'
  },
  buttonDivider: {
    marginTop: '5px',
    marginBottom: '10px'
  }
});

export const FieldsView = ({
  editingTab,
  cancelTab,
  isFetching,
  changed,
  syncErrors,
  history,
  userTabs,
  classes,
  ...props
}) => {
  const disabled = isFetching
    || Object.keys(changed).length === 0
    || Object.keys(syncErrors).length > 0;

  const cancelEditingTab = (e) => {
    e.stopPropagation();
    return cancelTab();
  };

  return (
    <Column
      className={`${classes.root}`}
      small={12}
      medium={10}
      large={8}>
      <PreviewModal />
      <EditModal />
      <Paper elevation={5} className={classes.contentContainer}>
        <AppBar position='static'>
          <Tabs value='fields' centered fullWidth onChange={(e, value) => history.push(value)}>
            <Tab data-route='/profile' value='profile' label='Profile' />
            <Tab data-route='/settings' value='settings' label='Settings' />
            <Tab data-route='/fields' value='fields' label='Fields' />
          </Tabs>
        </AppBar>
        <form className={classes.form}>
          <FormRow className={classes.addTabRow}>
            <FormField
              className={classes.addTabTextWrapper}
              fullWidth={false}
              label='Tab Name'
              name='tabName'
              type='text'
            />
            <Column className={classes.addTabButtonWrapper}>
              <Button
                primary
                icon={AddIcon}
                baseClasses={{
                  disabled: classes.updateTabButtonDisabled
                }}
                label='Add Tab'
                className={classes.updateTabButton}
                tooltip={editingTab ? 'Update tab name.' : 'Add new tab.'}
                disabled={disabled}
              />
              {editingTab && (
                <Button
                  onClick={cancelEditingTab}
                  variant='text'
                  secondary
                  label='Cancel'
                  className={classes.cancelTabButton}
                />
              )}
            </Column>
          </FormRow>
        </form>
        <Divider className={classes.buttonDivider} />
        {userTabs.map(tab => <FieldTab tab={tab} key={tab.tabIdx} />)}
      </Paper>
    </Column>
  );
};

FieldsView.defaultProps = {
  editingTab   : null,
  isFetching   : false,
  syncErrors   : {},
  errors       : []
};

FieldsView.propTypes = {
  classes      : PropTypes.instanceOf(Object).isRequired,
  history      : PropTypes.instanceOf(Object).isRequired,
  changed      : PropTypes.instanceOf(Object).isRequired,
  userTabs     : PropTypes.instanceOf(Object).isRequired,
  // contentClass : PropTypes.string.isRequired,
  cancelTab    : PropTypes.func.isRequired,
  isFetching   : PropTypes.bool,
  syncErrors   : PropTypes.instanceOf(Object),
  errors       : PropTypes.arrayOf(PropTypes.object),
  editingTab : PropTypes.shape({
    id  : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired
  }),
};

const stateProps = (state) => ({
  changed       : changedFields(state.form.fieldTabs),
  syncErrors    : _.get(state, 'form.fieldTabs.syncErrors'),
  isFetching    : _.get(state, 'api.fields.update.loading'),
  errors        : _.get(state, 'api.fields.update.errors'),
  editingTab    : _.get(state, 'FieldsView.editingTab'),
  initialValues : _.get(state, 'FieldsView.editingTab'),
  userTabs      : userTabsSelector(state),
});

const actionCreators = {
  cancelTab       : cancelTabEdit
};


const validateFields = {
  name: [
    ['required', 'Required'],
  ]
};

export default compose(
  withRouter,
  connect(stateProps, actionCreators),
  reduxForm({
    form: 'fieldTabs',
    enableReinitialize: true,
    touchOnChange: true,
    validate: validate(validateFields, false)
  }),
  withStyles(styles),
)(FieldsView);
