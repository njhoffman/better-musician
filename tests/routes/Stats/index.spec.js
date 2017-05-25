import configureStore from 'redux-mock-store';
import { Promise as ES6Promise } from 'es6-promise';

describe('Routes', () => {
  describe('Stats', () => {
    describe('Routing', () => {
      let sandbox, initViewStub, injectReducerStub, statsRoute, allStub, catchStub, errorStub;
      const inject = require('inject!routes/Stats');
      const mockStore = configureStore();
      const store = mockStore();
      const cbStub = sinon.stub();
      const nextStateStub = sinon.stub();

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        initViewStub = sandbox.stub();
        injectReducerStub = sandbox.stub();
        allStub = sandbox.stub(ES6Promise, 'all').returns(Promise.resolve('success'));
        errorStub = sandbox.stub(console, 'error');
        statsRoute = inject({
          'store/reducers' : { injectReducer: injectReducerStub },
          'store/view' : { initView : initViewStub },
          'es6-promise' : { Promise: { all: allStub, catch: catchStub } }
        }).default;
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should return if authentication set and auth returns false', () => {
        const auth = sinon.stub().returns(false);
        const ret = statsRoute(store, auth).getComponent(nextStateStub, cbStub);
        expect(ret).to.be.undefined;
        expect(allStub).to.not.be.called;
        expect(injectReducerStub).to.not.be.called;
        expect(initViewStub).to.not.be.called;
        expect(cbStub).to.not.be.called;
      });

      // it('Should require relevant files in a promise chain', () => {
      //   statsRoute(store).getComponent(nextStateStub, cbStub);
      //   expect(allStub).to.be.called.once;
      // });

      it('Should inject reducer, initialize view and invoke callback after importing modules', () => {
        statsRoute(store).getComponent(nextStateStub, cbStub);
        allStub().then(() => {
          expect(injectReducerStub).to.be.called.once;
          expect(initViewStub).to.be.called.once;
          expect(cbStub).to.be.called.once;
        });
      });

      it('Should catch and log an error if it occurs', () => {
        allStub = sinon.stub().returns(Promise.reject(new Error('testing')));
        statsRoute = inject({
          'store/reducers' : { injectReducer: injectReducerStub },
          'store/view' : { initView : initViewStub },
          'es6-promise' : { Promise: { all: allStub, catch: catchStub } }
        }).default;
        statsRoute(store).getComponent(nextStateStub, cbStub);
        allStub().then(() => {
          expect(errorStub).to.be.called.once;
          errorStub.restore();
        });
      });
    });
  });
});