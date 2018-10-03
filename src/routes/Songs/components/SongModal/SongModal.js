import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import { reduxForm } from 'redux-form';
import {
  AppBar, Dialog, DialogContent,
  DialogActions, Tabs, Tab,
  Typography, withMobileDialog, withStyles
} from '@material-ui/core';
import { Row, Column } from 'react-foundation';

import { uiHideModal } from 'actions/ui';
import { SONG_MODAL, MODAL_VARIANT_EDIT, MODAL_VARIANT_ADD } from 'constants/ui';
import {
  currentSong as currentSongSelector,
  savedTabs as savedTabsSelector
} from 'routes/Songs/modules/selectors';

import MainTab from './MainTab';
import ActionButtons from './ActionButtons';
//
import FormField, { FormRow } from 'components/Field';
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
export class SongModal extends Component {
  static propTypes = {
    uiHideModal:   PropTypes.func.isRequired,
    isOpen:        PropTypes.bool.isRequired,
    variant:       PropTypes.string.isRequired,
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
    const { classes, activeField, variant, errors } = this.props;

    lastActiveField = activeField || lastActiveField;

    const tabProps = { lastActiveField, activeField, variant };
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
                      {errors && [].concat(errors).map((error, i) =>
                        <p key={i} className='error'>{error}</p>
                      )}
                    </Column>
                  </Row>
                  {chunk(tab.fields, 2).map((fields, fieldIdx) => (
                    <FormRow key={fieldIdx}>
                      {fields.map(field => (
                        <FormField
                          key={field.idx}
                          name={field.name}
                          small={fields.length === 1 ? 12 : 6}
                          variant={variant}
                          initialValues={this.props.initialValues}
                          centerOnSmall
                          { ...field }
                        />
                      ))}
                    </FormRow>
                  ))}
                </TabContainer>
              )))}

          </form>
        </DialogContent>
        <DialogActions>
          <ActionButtons variant={variant} />
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

const initialValues = (song, addModalVariant) => {
  if (song && !addModalVariant) {
    // return object for nested models, redux form tries to reset and breaks if not a plain object
    // TODO: find a better way
    const ivSong = Object.assign({}, song);
    ivSong.artist = Object.assign({}, song.artist.ref, { fullName: song.artist.fullName });
    ivSong.genre = song.genre.ref;
    ivSong.instrument = song.instrument.ref;
    return ivSong;
  }
};

const mapDispatchToProps = { uiHideModal };

const mapStateToProps = (state) => ({
  initialValues: initialValues(currentSongSelector(state), state.ui.modal.variant === MODAL_VARIANT_ADD),
  activeField:   state.form.songForm && state.form.songForm.active ? state.form.songForm.active : '',
  savedTabs:     savedTabsSelector(state),
  variant:       state.ui.modal.variant || MODAL_VARIANT_EDIT,
  errors:        state.ui.modal.errors,
  isOpen:        state.ui.modal.name === SONG_MODAL
});

const songForm = withStyles(styles)(reduxForm({
  form: 'songForm',
  enableReinitialize: true,
  // validate
})(SongModal));

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(songForm));
