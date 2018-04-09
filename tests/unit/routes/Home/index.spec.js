import configureStore from 'redux-mock-store';
// import { Promise as ES6Promise } from 'es6-promise';

describe('Routes', () => {
  describe('Home', () => {
    describe('Routing', () => {
      let sandbox, homeRoute, allStub, catchStub;
      const inject = require('inject!routes/Home');
      const mockStore = configureStore();
      const store = mockStore();
      const cbStub = sinon.stub();
      const nextStateStub = sinon.stub();

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        catchStub = sandbox.stub();
        // allStub = sandbox.stub().returns(Promise.resolve('success'));
        allStub = sandbox.stub().resolves('test_container', 'test_reducer');
        homeRoute = inject({
          'es6-promise' : { Promise: { all: allStub, catch: catchStub } }
        }).default;
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should return if authentication set and auth returns false', () => {
        const authStub = sinon.stub().returns(false);
        const ret = homeRoute(store, authStub).getComponent(nextStateStub, cbStub);
        expect(authStub).to.be.called;
        expect(ret).to.be.undefined;
        expect(allStub).to.not.be.called;
      });

      it('Should require relevant files in a promise chain', () => {
        const authStub = sinon.stub().returns(true);
        homeRoute(store, authStub).getComponent(nextStateStub, cbStub);
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
