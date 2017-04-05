import {
  uiToggleDrawerMenu,
  uiHideDrawerMenu,
  uiShowSnackbar,
  uiHideSnackbar,
  UI_HIDE_SNACKBAR,
  UI_SHOW_SNACKBAR,
  UI_TOGGLE_DRAWER_MENU,
  UI_SHOW_DRAWER_MENU,
  UI_HIDE_DRAWER_MENU,
  UI_SHOW_MODAL,
  UI_HIDE_MODAL,
  initialState,
  default as uiReducer
} from 'store/ui';
import { omit, cloneDeep } from 'lodash';

describe('(Store) UI', () => {
  const fakeAction = { type: '@@@@@@' };
  let _initialState;

  beforeEach(() => {
    _initialState = cloneDeep(initialState);
  });

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(uiReducer).to.be.a('function');
    });
    it('Should initialize with correct initialState object.', () => {
      expect(uiReducer(undefined, fakeAction)).to.deep.equal(_initialState);
    });
    it('Should return the previous state if an action was not matched.', () => {
      const prevState = { fakeKey: 'fakeValue' };
      const state = uiReducer(prevState, fakeAction);
      expect(state).to.deep.equal(prevState);
    });
  });

  describe('(Action Handlers)', () => {
    describe(UI_HIDE_SNACKBAR, () => {
      it('Should return previous snackbar state with isOpen set to false.', () => {
        const state = uiReducer(undefined, { type: UI_HIDE_SNACKBAR });
        expect(omit(state.snackbar, 'isOpen')).to.deep.equal(omit(_initialState.snackbar, 'isOpen'));
        expect(state.snackbar).to.have.property('isOpen').that.equals.false;
      });
    });
    describe(UI_SHOW_SNACKBAR, () => {
      it('Should return snackbar state with isOpen set to true and message set.', () => {
        const state = uiReducer(undefined, { type: UI_SHOW_SNACKBAR, meta: { message: 'test' } });
        expect(state.snackbar).to.have.property('isOpen').that.equals.true;
        expect(state.snackbar).to.have.property('message').that.equals('test');
      });
      it('Should otherwise return previous snackbar state.', () => {
        const state = uiReducer(undefined, { type: UI_SHOW_SNACKBAR });
        expect(omit(state.snackbar, ['isOpen', 'message']))
          .to.deep.equal(omit(_initialState.snackbar, ['isOpen', 'message']));
      });
    });

    describe(UI_HIDE_DRAWER_MENU, () => {
      it('Should return previous drawer state with isOpen set to false.', () => {
        const state = uiReducer(undefined, { type: UI_HIDE_DRAWER_MENU });
        expect(omit(state.drawer, 'isOpen')).to.deep.equal(omit(_initialState.drawer, 'isOpen'));
        expect(state.drawer).to.have.property('isOpen').that.equals.false;
      });
    });
    describe(UI_SHOW_DRAWER_MENU, () => {
      it('Should return previous drawer state with isOpen set to true.', () => {
        const state = uiReducer(undefined, { type: UI_SHOW_DRAWER_MENU });
        expect(omit(state.drawer, 'isOpen')).to.deep.equal(omit(_initialState.drawer, 'isOpen'));
        expect(state.drawer).to.have.property('isOpen').that.equals.true;
      });
    });
    describe(UI_TOGGLE_DRAWER_MENU, () => {
      it('Should return previous drawer state with isOpen boolean toggled.', () => {
        _initialState.drawer.isOpen = false;
        let state = uiReducer(_initialState, { type: UI_SHOW_DRAWER_MENU });
        expect(omit(state.drawer, 'isOpen')).to.deep.equal(omit(_initialState.drawer, 'isOpen'));
        expect(state.drawer).to.have.property('isOpen').that.equals.true;
        state = uiReducer(undefined, { type: UI_TOGGLE_DRAWER_MENU });
        expect(state.drawer).to.have.property('isOpen').that.equals.true;
      });
    });

    describe(UI_SHOW_MODAL, () => {
      const modalAction = {
        type: UI_SHOW_MODAL,
        meta: { type: 'test_type', props: 'test_props' }
      };
      it('Should return state with modal type and props.', () => {
        const state = uiReducer(undefined, modalAction);
        expect(state.modal).to.have.property('type').that.equals('test_type');
        expect(state.modal).to.have.property('props').that.equals('test_props');
      });
      it('Should otherwise return previous modal state.', () => {
        const state = uiReducer(undefined, modalAction);
        expect(omit(state.snackbar, ['type', 'props']))
          .to.deep.equal(omit(_initialState.snackbar, ['type', 'props']));
      });
    });
    describe(UI_HIDE_MODAL, () => {
      it('Should reset modal state to initialState', () => {
        const initialModal = { ..._initialState.modal };
        _initialState.modal = { fakeKey: 'fakeValue' };
        const state = uiReducer(_initialState, { type: UI_HIDE_MODAL });
        expect(state.modal).to.deep.equal(initialModal);
      });
    });
  });

  describe('(Action Creators)', () => {
    it('Should create an action to hide the drawer menu', () => {
      expect(uiHideDrawerMenu).to.be.a('function');
      expect(uiHideDrawerMenu()).to.deep.equal({ type: UI_HIDE_DRAWER_MENU });
    });
    it('Should create an action to toggle the drawer menu', () => {
      expect(uiToggleDrawerMenu).to.be.a('function');
      expect(uiToggleDrawerMenu()).to.deep.equal({ type: UI_TOGGLE_DRAWER_MENU });
    });
    it('Should create an action to show the snackbar', () => {
      expect(uiShowSnackbar).to.be.a('function');
      expect(uiShowSnackbar()).to.deep.equal({ type: UI_SHOW_SNACKBAR });
    });
    it('Should create an action to hide the snackbar', () => {
      expect(uiHideSnackbar).to.be.a('function');
      expect(uiHideSnackbar()).to.deep.equal({ type: UI_HIDE_SNACKBAR });
    });
    // it('Should create an action to hide all modals if no type is given', () => {});
    // it('Should create an action to hide a specific modal if a type is given', () => {});
  });
});

