import configureStore from 'redux-mock-store';
import { Promise as ES6Promise } from 'es6-promise';

describe('Routes', () => {
  describe('Fields', () => {
    describe('Routing', () => {
      let sandbox, injectReducerStub, fieldsRoute, allStub, catchStub, cbStub, nextStateStub, fetchSongsStub;
      const inject = require('inject!routes/Fields');
      const mockStore = configureStore();
      const store = mockStore();

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        fetchSongsStub = sandbox.stub();
        cbStub = sandbox.stub();
        nextStateStub = sandbox.stub();
        injectReducerStub = sandbox.stub();
        catchStub = sandbox.stub();
        // allStub = sandbox.stub().returns(Promise.resolve('success'));
        allStub = sandbox.stub().resolves('test_container', 'test_reducer');
        fieldsRoute = inject({
          'store/reducers' : { injectReducer: injectReducerStub },
          'es6-promise' : { Promise: { all: allStub, catch: catchStub } },
          'store/api' : { fetchSongs: fetchSongsStub }
        }).default;
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should return if authentication set and auth returns false', () => {
        const authStub = sinon.stub().returns(false);
        const ret = fieldsRoute(store, authStub).getComponent(nextStateStub, cbStub);
        expect(authStub).to.be.called;
        expect(ret).to.be.undefined;
        expect(allStub).to.not.be.called;
      });

      it('Should require relevant files in a promise chain', () => {
        const authStub = sinon.stub().returns(true);
        fieldsRoute(store, authStub).getComponent(nextStateStub, cbStub);
        expect(allStub).to.be.called.once;
      });

      // it('Should inject reducer, initialize view and invoke callback after requiring files', () => {
      //   // TODO: how to test injectReducerStub, cbStub called? async call within sync function,
      //   // is it possible to test without breaking out out?
      // });

      // it('Should catch and log error thrown during import process', () => { });
    });
  });
});
