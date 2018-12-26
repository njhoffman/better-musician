import * as DEV from 'constants/dev';

export const devStartActionSet = ({ name, actions }) => (dispatch) => (
  dispatch({
    type: DEV.EXECUTE_ACTION_SET_START,
    payload: name,
    meta: { actions }
  })
);

export const devEndActionSet = ({ name }) => (dispatch) => (
  dispatch({
    type: DEV.EXECUTE_ACTION_SET_COMPLETE,
    payload: name
  })
);

export const devDoAction = action => dispatch => dispatch(action);

export const devPersistState = (statePath) => ({
  type: DEV.PERSIST_STATE,
  payload: statePath
});

export const inputText = (form, field, data, delay) => {
  const newAction = data.split('').map((char, i) => ({
    type: '@@redux-form/CHANGE',
    meta: { form, field, touch: false, persistentSubmitErrors: false },
    payload: data.slice(0, i),
    _interval: delay
  }));
  return newAction;
};

export const devUpdateSetting = (path, val) => (dispatch) => (
  dispatch({
    type: DEV.UPDATE_SETTING,
    payload: { [path]: val }
  })
);
