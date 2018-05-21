import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chunk, get } from 'lodash';
import { reduxForm } from 'redux-form';
import { Dialog, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import withTheme from 'material-ui/styles/withTheme';

import { uiHideModal, MODAL_ADD_SONG } from 'store/ui';
import {
  currentSong as currentSongSelector,
  savedTabs as savedTabsSelector
} from 'routes/Songs/modules/selectors';

import AddSongMainTab from './AddSongMainTab';
import AddSongButtons from './AddSongButtons';
import CustomField from 'components/CustomField';
import css from './AddSong.scss';

let lastActiveField = 'artist';

// TODO: investigate stack trace problem when forgetting to import 'Component'
export class AddSongModal extends Component {
  static propTypes = {
    uiHideModal:   PropTypes.func.isRequired,
    isOpen:        PropTypes.bool.isRequired,
    modal:         PropTypes.object.isRequired,
    savedTabs:     PropTypes.array.isRequired,
    activeField:   PropTypes.string,
    theme:      PropTypes.object.isRequired
  };

  state = {
    value: 'main'
  };

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { modal, theme } = this.props;
    const className = css.addSongModal + ' ' + css[this.props.modal.action];
    const modalView = {
      isView  : () => modal.props.action === 'view',
      isEdit  : () => modal.props.action === 'edit',
      isAdd   : () => modal.props.action === 'add',
      getName : () => modal.props.action
    };

    lastActiveField = ['artist', 'instrument'].indexOf(this.props.activeField) !== -1 ? this.props.activeField : lastActiveField;

    const labelStyle     = modalView.isView() ? { textAlign: 'center', width: '100%' } : { };
    const textInputStyle = modalView.isView() ? { color: theme.instrumental.textColor } : { };
    const textStyle      = modalView.isView() ? { cursor: 'default' } : {};

    const styleObj = {
      dialog       : { maxWidth: '650px', width: 'initial' },
      dialogBody   : { padding: '5px', overflowY: 'auto' },
      tabContainer : { paddingTop: '20px' }
    };

    const mainTabProps = {
      lastActiveField,
      textInputStyle,
      labelStyle,
      textStyle,
      theme,
      modalView
    };

    const { value } = this.state;

    return (
      <Dialog
        actions={<AddSongButtons modalView={modalView} />}
        open={this.props.isOpen}
        className={className}>
        <form>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab value='main' label='Main Fields' />
            {/* {props.savedTabs.map((tab, tabIdx) => */}
            {/*   <Tab */}
            {/*     key={tabIdx} */}
            {/*     label={tab.name}> */}
            {/*     <Row> */}
            {/*       <Column> */}
            {/*         {modal.props.errors && [].concat(modal.props.errors).map((error, i) => */}
            {/*           <p key={i} className='error'>{error}</p> */}
            {/*         )} */}
            {/*       </Column> */}
            {/*     </Row> */}
            {/*     {chunk(tab.fields, 2).map((fields, fieldIdx) => */}
            {/*       <Row */}
            {/*         style={{ textAlign: 'center' }} */}
            {/*         key={fieldIdx}> */}
            {/*         {fields.map((field) => */}
            {/*           <CustomField */}
            {/*             key={field.idx} */}
            {/*             style={textStyle} */}
            {/*             labelStyle={labelStyle} */}
            {/*             disabled={modalView.isView()} */}
            {/*             underlineShow={!modalView.isView()} */}
            {/*             inputStyle={textInputStyle} */}
            {/*             field={field} */}
            {/*             initialValues={props.initialValues} */}
            {/*             centerOnSmall */}
            {/*             small={fields.length === 1 ? 12 : 6} */}
            {/*           /> */}
            {/*         )} */}
            {/*       </Row> */}
            {/*     )} */}
            {/* </Tab> */}
            {/* )} */}
          </Tabs>
          {value === 'main' && <AddSongMainTab {...mainTabProps} />}
        </form>
      </Dialog>
    );
  }
};

const validate = (values) => {
  const errors = {};
  // TODO: figure out why autocomplete meta doesnt get errors or touched assigned
  /* eslint-disable max-len  */
  // addressed: https://github.com/erikras/redux-form-material-ui/pull/159/commits/55b9225a2d9a22664458eb13f5a7d67f9e659db1
  // this breaks material-ui Dialog ref to dialogContent
  /* eslint-enable max-len  */
  const requiredFields = [ 'title', 'artist.lastName', 'instrument.name' ];
  requiredFields.forEach(field => {
    if (!get(values, field)) {
      errors[ field ] = 'Required';
    }
  });
  return errors;
};

const initialValues = (song, modalAction) => {
  if (song && modalAction !== 'add') {
    // return object for nested models, redux form tries to reset and breaks if not a plain object
    const ivSong = Object.assign({}, song);
    // ivSong.artist = song.artist.ref;
    // ivSong.genre = song.genre.ref;
    // ivSong.instrument = song.instrument.ref;
    return ivSong;
  }
};

const mapDispatchToProps = { uiHideModal };

const mapStateToProps = (state) => ({
  initialValues: initialValues(currentSongSelector(state), state.ui.modal.props.action),
  activeField:   state.form.addSongForm ? state.form.addSongForm.active : null,
  formValues:    state.form.addSongForm ? state.form.addSongForm.values : null,
  savedTabs:     savedTabsSelector(state),
  modal:         state.ui.modal,
  isOpen:        state.ui.modal.type === MODAL_ADD_SONG
});

const addSongForm = withTheme()(reduxForm({
  form: 'addSongForm',
  // enableReinitialize: true,
  // validate
})(AddSongModal));


export default connect(mapStateToProps, mapDispatchToProps)(addSongForm);
