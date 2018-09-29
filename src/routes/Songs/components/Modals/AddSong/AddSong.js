import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import { reduxForm } from 'redux-form';
import {
  AppBar, Dialog, DialogContent,
  DialogActions, Tabs, Tab,
  Typography, withMobileDialog
} from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import { withStyles } from '@material-ui/core';

import { uiHideModal } from 'actions/ui';
import { MODAL_ADD_SONG } from 'constants/ui';
import {
  currentSong as currentSongSelector,
  savedTabs as savedTabsSelector
} from 'routes/Songs/modules/selectors';

import MainTab from './MainTab';
import ActionButtons from './ActionButtons';
//
import FormField from 'components/Field';
// import css from './AddSong.scss';

let lastActiveField = '';

const styles = (theme) => ({
  dialogPaper: {
    alignSelf: 'start',
    margin: '50px 0px 0px 0px',
    overflowY: 'visible',
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px'
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '650px'
    }
  },
  dialogContent: {
    overflowY: 'visible',
    textAlign: 'center',
    padding: '0 !important' // :first-child padding-top: 24px
  },
  editField: {
    color: 'red'
  },
  fieldGroup: {
    width: '100%',
    maxWidth: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    boxAlign: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  }


//   form {
//     .selectOptions {
//       margin-top: 10px;
//       max-width: 550px;
//       max-height: 400px;
//       overflow-y: auto;
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: center;
//     }
//
//     .videoWrapper {
//       margin-top: 10px;
//       max-width: 450px;
//       overflow-y: auto;
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: center;
//     }
//
//     .viewField {
//       input[type="text"] {
//         text-overflow: ellipsis;
//       }
//     }
//   }
// }
});

const TabContainer = (props) => (
  <Typography component='div' style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

// TODO: investigate stack trace problem when forgetting to import 'Component'
export class AddSongModal extends Component {
  static propTypes = {
    uiHideModal:   PropTypes.func.isRequired,
    isOpen:        PropTypes.bool.isRequired,
    modal:         PropTypes.object.isRequired,
    savedTabs:     PropTypes.array.isRequired,
    activeField:   PropTypes.string,
    classes:       PropTypes.object.isRequired,
    initialValues: PropTypes.object
  };

  state = {
    value: 0
  };

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { modal, classes, activeField } = this.props;
    // const className = classes.addSongModal + ' ' + classes[this.props.modal.action];
    const modalView = {
      isView  : () => modal.type === 'view',
      isEdit  : () => modal.type === 'edit',
      isAdd   : () => modal.type === 'add'
    };

    lastActiveField = activeField || lastActiveField;

    // const labelStyle = modalView.isView() ? { textAlign: 'center', width: '100%' } : { };
    // const textStyle = modalView.isView() ? { cursor: 'default' } : {};

    const tabProps = { lastActiveField, activeField, noEdit: modalView.isView(), disabled: modalView.isView()};
    const { value } = this.state;

    return (
      <Dialog
        open={this.props.isOpen}
        classes={{ paper: classes.dialogPaper }} >
        <DialogContent className={classes.dialogContent}>
          <form>
            <AppBar position='static' >
              <Tabs
                centered={true}
                fullWidth={true}
                value={value}
                onChange={(event, value) => this.handleChange(event, value)}>
                <Tab label='Main Fields' />
                {this.props.savedTabs.map((tab, tabIdx) => <Tab key={tabIdx} label={tab.name} />)}
              </Tabs>
            </AppBar>

            {value === 0 && (
              <TabContainer>
                <MainTab {...tabProps} />
              </TabContainer>
            )}

            {this.props.savedTabs.map((tab, tabIdx) => (
              value === (tabIdx + 1) && (
                <TabContainer key={tabIdx}>
                  <Row>
                    <Column>
                      {modal.errors && [].concat(modal.errors).map((error, i) =>
                        <p key={i} className='error'>{error}</p>
                      )}
                    </Column>
                  </Row>
                  {chunk(tab.fields, 2).map((fields, fieldIdx) => (
                    <Row key={fieldIdx}>
                      {fields.map(field => (
                        <FormField
                          noEdit={modalView.isView()}
                          key={field.idx}
                          field={field}
                          fields={fields}
                          name={field.name}
                          initialValues={this.props.initialValues}
                          centerOnSmall
                          small={fields.length === 1 ? 12 : 6}
                        />
                      ))}
                    </Row>
                  ))}
                </TabContainer>
              )))}

          </form>
        </DialogContent>
        <DialogActions>
          <ActionButtons noEdit={modalView.isView()} modalView={modalView} />
        </DialogActions>
      </Dialog>
    );
  }
}

// const validate = (values) => {
//   const errors = {};
//   // TODO: figure out why autocomplete meta doesnt get errors or touched assigned
//   #<{(| eslint-disable max-len  |)}>#
//   // addressed: https://github.com/erikras/redux-form-material-ui/pull/159/commits/55b9225a2d9a22664458eb13f5a7d67f9e659db1
//   // this breaks material-ui Dialog ref to dialogContent
//   #<{(| eslint-enable max-len  |)}>#
//   const requiredFields = [ 'title', 'artist.lastName', 'instrument.name' ];
//   requiredFields.forEach(field => {
//     if (!get(values, field)) {
//       errors[ field ] = 'Required';
//     }
//   });
//   return errors;
// };

const initialValues = (song, modalType) => {
  if (song && modalType !== 'add') {
    // return object for nested models, redux form tries to reset and breaks if not a plain object
    const ivSong = Object.assign({}, song);
    ivSong.artist = song.artist.ref;
    ivSong.genre = song.genre.ref;
    ivSong.instrument = song.instrument.ref;
    return ivSong;
  }
};

const mapDispatchToProps = { uiHideModal };

const mapStateToProps = (state) => ({
  initialValues: initialValues(currentSongSelector(state), state.ui.modal.type),
  activeField:   state.form.addSongForm ? state.form.addSongForm.active : '',
  formValues:    state.form.addSongForm ? state.form.addSongForm.values : null,
  savedTabs:     savedTabsSelector(state),
  modal:         state.ui.modal,
  isOpen:        state.ui.modal.name === MODAL_ADD_SONG
});

const addSongForm = withStyles(styles)(reduxForm({
  form: 'addSongForm'
  // enableReinitialize: true,
  // validate
})(AddSongModal));

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(addSongForm));
