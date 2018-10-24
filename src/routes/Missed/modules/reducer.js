export const INIT_VIEW = 'INIT_VIEW';

const ACTION_HANDLERS = {
  [INIT_VIEW] : (state, action) => ({ ...state, initialized: true })
};

const initialState = { initialized: false };
export default function missedReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
