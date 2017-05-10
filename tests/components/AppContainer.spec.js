import React from 'react';
import { mount, shallow } from 'enzyme';
import createHistory from 'history/createBrowserHistory';
import createStore from 'store/createStore';
import AppContainer from 'components/AppContainer';

const history = createHistory();
const store = createStore({}, history);

// const routes = require('./routes/index').default(store, history);

describe('(Components) AppContainer', () => {
});
