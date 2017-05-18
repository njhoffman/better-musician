import configureStore from 'redux-mock-store';

const mockPromises = require('mock-promises');

describe('Routes', () => {
  describe('Register', () => {
    describe('Routing', () => {
      let sandbox, initViewStub, injectReducerStub, registerRoute, allStub;
      const inject = require('inject!routes/Register');
      const mockStore = configureStore();
      const store = mockStore();

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        initViewStub = sandbox.stub();
        injectReducerStub = sandbox.stub();
        allStub = sandbox.stub(Promise, 'all');
        registerRoute = inject({
          'store/reducers' : { injectReducer: injectReducerStub },
          'store/view' : { initView : initViewStub }
        }).default;

      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should return if authentication set and auth returns false', () => {
        const auth = sinon.stub().returns(false);
        const cbStub = sinon.stub();
        const nextStateStub = sinon.stub();
        const ret = registerRoute(store, auth).getComponent(nextStateStub, cbStub);
        expect(ret).to.be.undefined;
        expect(allStub).to.not.be.called;
        expect(injectReducerStub).to.not.be.called;
        expect(initViewStub).to.not.be.called;
        expect(cbStub).to.not.be.called;
      });
      // it('Should inject reducer and initialize view after importing modules', () => {
      //   const cbStub = sinon.stub();
      //   const nextStateStub = sinon.stub();
      //
      //   registerRoute(store).getComponent(nextStateStub, cbStub);
      //   expect(allStub).to.be.called.once;
      //   expect(ret).to.be.undefined;
      //   expect(injectReducerStub).to.be.called.once;
      //   expect(initViewStub).to.be.called.once;
      // });
      // it('Should invoke callback view after importing modules', () => {
      // });
      // it('Should catch and log an error if it occurs', () => {
      // });
    });
  });
});
