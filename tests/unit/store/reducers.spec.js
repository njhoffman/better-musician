
describe('Store', () => {
  describe('Reducers', () => {
    let sandbox;
    const inject = require('inject!store/reducers');

    describe('makeRootReducer', () => {
      let combineReducersStub = sinon.spy();
      let reducerStub = sinon.spy();
      let ormStub = sinon.stub();
      let ormRegisterStub = sinon.spy();
      ormStub.prototype.register = ormRegisterStub;
      const reducers = inject({
        'redux-orm': {
          createReducer: () => reducerStub,
          ORM: ormStub
        },
        redux : {
          combineReducers: combineReducersStub
        },
        'redux-form' : {
          reducer: reducerStub
        },
        'redux-auth' : {
          authStateReducer: reducerStub
        },
        './location': reducerStub,
        './ui' : reducerStub,
        './api' : reducerStub
      });

      beforeEach(() => {
        combineReducersStub.reset();
        ormStub.reset();
        ormRegisterStub.reset();
      });

      it('Should call combineReducers once.', () => {
        reducers.makeRootReducer();
        expect(combineReducersStub).to.be.called.once;
      });

      it('Should register inject ORM models.', () => {
        const injectedModels = [{ injectedModel1: 'injected_val_1' }, { injectedModel2: 'injected_val_2' }];
        reducers.makeRootReducer({}, injectedModels);
        expect(ormRegisterStub).to.be.called.once;
        expect(ormRegisterStub).to.be.calledWith(...injectedModels);
      });
      it('Should call combineReducers with provided asyncReducers.', () => {
        reducers.makeRootReducer({ async1: 'async_val_1', async2: 'async_val_2' });
        expect(combineReducersStub).to.be.calledWith({
          orm:      reducerStub,
          location: reducerStub,
          ui:       reducerStub,
          api:      reducerStub,
          auth:     reducerStub,
          form:     reducerStub,
          async1:   'async_val_1',
          async2:   'async_val_2'
        });
      });
    });

    describe('injectReducer', () => {
      let reducerStub, makeRootReducerStub, storeStub, replaceReducerStub;

      let reducers = require('store/reducers');

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        reducerStub = sandbox.stub();
        makeRootReducerStub = sandbox.stub().returns('combined_reducers');
        replaceReducerStub = sandbox.stub();
        storeStub = { asyncReducers: {}, replaceReducer: replaceReducerStub };
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should assign the reducer to asyncReducers property of store', () => {
        reducers.injectReducer(storeStub, { key: 'new_key_1', reducer: reducerStub });
        expect(storeStub.asyncReducers).to.deep.equal({ 'new_key_1' : reducerStub });
      });

      it('Should call makeRootReducer with store asyncReducers', () => {
        reducers.makeRootReducer = makeRootReducerStub;
        reducers.injectReducer(storeStub, { key: 'new_key_1', reducer: reducerStub });
        expect(makeRootReducerStub).to.be.called.once;
        expect(makeRootReducerStub).to.be.calledWith({ 'new_key_1' : reducerStub }, undefined);
      });

      it('Should return combined reducers from makeRootReducer to store replaceReducer method', () => {
        reducers.makeRootReducer = makeRootReducerStub;
        reducers.injectReducer(storeStub, { key: 'new_key_1', reducer: reducerStub });
        expect(makeRootReducerStub).to.be.called.once;
        expect(replaceReducerStub).to.be.called.once;
        expect(replaceReducerStub).to.be.calledWith('combined_reducers');
      });

      it('Should return without calling replaceReducer if store already contains reducer key.', () => {
        storeStub.asyncReducers = { 'existing_key_1' : () => {} };
        reducers.injectReducer(storeStub, { key: 'existing_key_1', reducer: null });
        expect(replaceReducerStub).to.not.be.called;
        expect(makeRootReducerStub).to.not.be.called;
      });
    });
  });
});
