import {
  default as createStore
} from 'store/createStore';

describe('Store', () => {
  describe('createStore', () => {
    let store;

    before(() => {
      store = createStore({}, { listen: () => { }});
    });

    it('should have an empty asyncReducers object', () => {
      expect(store.asyncReducers).to.be.an('object');
      expect(store.asyncReducers).to.be.empty;
    });

    describe('Location', () => {
      it('store should be initialized with Location state', () => {
        const location = {
          pathname : '/echo'
        };
        store.dispatch({
          type    : 'LOCATION_CHANGE',
          payload : location
        });
        expect(store.getState().location).to.deep.equal(location);
      });
    });
  });
});
