import {
  songsSuccess,
  updateUser,
  userSuccess,
  FETCH_SONGS,
  SONGS_REQUEST,
  SONGS_SUCCESS,
  SONGS_FAILURE,
  LOAD_ARTISTS,
  LOAD_INSTRUMENTS,
  LOAD_GENRES,
  LOAD_SONGS,
  LOAD_FIELDS,
  AUTHENTICATE_START,
  AUTHENTICATE_COMPLETE,

  UPDATE_USER,
  USER_SUCCESS,
  USER_FAILURE,
  initialState,
  default as apiReducer
} from 'store/api';
import { omit, cloneDeep } from 'lodash';

describe('(Store) API', () => {
  const fakeAction = { type: '@@@@@@' };
  let _initialState;

  beforeEach(() => {
    _initialState = cloneDeep(initialState);
  });

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(apiReducer).to.be.a('function');
    });
    it('Should initialize with correct initialState object.', () => {
      expect(apiReducer(undefined, fakeAction)).to.deep.equal(_initialState);
    });
    it('Should return the previous state if an action was not matched.', () => {
      const prevState = { fakeKey: 'fakeValue' };
      const state = apiReducer(prevState, fakeAction);
      expect(state).to.deep.equal(prevState);
    });
  });
  describe('(Action Handlers)', () => {
    describe(AUTHENTICATE_START, () => {
      it('Should return previous state with isFetching set to true.', () => {
        const state = apiReducer(undefined, { type: AUTHENTICATE_START });
        expect(omit(state, 'isFetching')).to.deep.equal(omit(_initialState, 'isFetching'));
        expect(state).to.have.property('isFetching').that.equals.true;
      });
    });
    describe(AUTHENTICATE_COMPLETE, () => {
      it('Should return previous state with isFetching set to false.', () => {
        const state = apiReducer(undefined, { type: AUTHENTICATE_COMPLETE });
        expect(omit(state, ['isFetching', 'initialized']))
          .to.deep.equal(omit(_initialState, ['isFetching', 'initialized']));
        expect(state).to.have.property('isFetching').that.equals.false;
      });
      it('Should add "user" to initialized array if it does not already exist.', () => {
        let state = apiReducer(undefined, { type: AUTHENTICATE_COMPLETE });
        expect(state).to.have.property('initialized').that.deep.equals(['user']);
        state = apiReducer(undefined, { type: AUTHENTICATE_COMPLETE });
        expect(state).to.have.property('initialized').that.deep.equals(['user']);
      });
    });
    describe(SONGS_REQUEST, () => {
      it('Should return previous state with isFetching set to true.', () => {
        const state = apiReducer(undefined, { type: SONGS_REQUEST });
        expect(omit(state, 'isFetching')).to.deep.equal(omit(_initialState, 'isFetching'));
        expect(state).to.have.property('isFetching').that.equals.true;
      });
    });
    describe(SONGS_SUCCESS, () => {
      it('Should return previous state with isFetching set to false.', () => {
        const state = apiReducer(undefined, { type: SONGS_SUCCESS });
        expect(omit(state, ['isFetching', 'initialized']))
          .to.deep.equal(omit(_initialState, ['isFetching', 'initialized']));
        expect(state).to.have.property('isFetching').that.equals.false;
      });
      it('Should add "songs" to initialized array if it does not already exist.', () => {
        let state = apiReducer(undefined, { type: SONGS_SUCCESS });
        expect(state).to.have.property('initialized').that.deep.equals(['songs']);
        state = apiReducer(undefined, { type: SONGS_SUCCESS });
        expect(state).to.have.property('initialized').that.deep.equals(['songs']);
      });
    });
    describe(UPDATE_USER, () => {
      it('Should return previous state with isFetching set to true.', () => {
        const state = apiReducer(undefined, { type: UPDATE_USER });
        expect(omit(state, 'isFetching')).to.deep.equal(omit(_initialState, 'isFetching'));
        expect(state).to.have.property('isFetching').that.equals.true;
      });
    });
    describe(USER_SUCCESS, () => {
      it('Should return previous state with isFetching set to false.', () => {
        const state = apiReducer(undefined, { type: USER_SUCCESS });
        expect(omit(state, 'isFetching')).to.deep.equal(omit(_initialState, 'isFetching'));
        expect(state).to.have.property('isFetching').that.equals.false;
      });
    });
  });

  describe('(Action Creators)', () => {
    describe('fetchSongs', () => {

    });
    describe('songsSuccess', () => {
      const songResponse = {
        tables: {
          artists: {},
          instruments: {},
          genres: {},
          fields: {},
          songs: {}
        }
      };
      const dispatchStub = sinon.spy();
      const songsSuccessStub = sinon.stub().returns(dispatchStub);


      it('Should dispatch action SONGS_SUCCESS with the response as payload.', () => {
        songsSuccess(songResponse);
        expect(dispatchStub).to.be.called.once;
      });
      it('Should dispatch action LOAD_ARTISTS with the artists as payload.', () => {
      });
      it('Should dispatch action LOAD_INSTRUMENTS with the instruments as payload.', () => {
      });
      it('Should dispatch action LOAD_GENRES with the genres as payload.', () => {
      });
      it('Should dispatch action LOAD_FIELDS with the fields as payload.', () => {
      });
      it('Should dispatch action LOAD_SONGS with the songs as payload.', () => {
      });
    });
    describe('updateUser', () => {
    });
    describe('userSuccess', () => {
    });
  });
});
