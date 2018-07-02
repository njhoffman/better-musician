const _ = require('lodash');
const { padRight } = require('../util');

const ignoredActions = ['@@redux-form/BLUR', '@@redux-form/CHANGE', '@@redux-form/FOCUS'];
module.exports = {
  _action: (action) => {
    if (ignoredActions.indexOf(action.type) !== -1) {
      return '';
    } else if (action.callApi) {
      return [
        `%cCALL_API %c${padRight(action.endpoint, 21)} %c ${action.payload ? JSON.stringify(action.payload) : ''}`,
        'color: #aa66ff; font-weight: bold', 'color: #22ccff', 'color: #886688;'
      ];
    } else if (action.payload) {
      return [
        `%c${padRight(action.type, 30)} %c ${JSON.stringify(action.payload)}`,
        'color: #88aaff;', 'color: #886688;'
      ];
    } else {
      return [
        `%c${padRight(action.type)}`,
        'color: #88aaff;'
      ];
    }
  },
  _sessionGet: ({ key, parsedVal, storage }) => {
    if (!_.isObject(parsedVal)) {
      return [
        `← (${storage}) %c${key} :%c ${parsedVal}`,
        'color: #22ccff', 'color: #bbb'
      ];
    } else {
      return [
        [`← (${storage}) : %c${key}`, 'color: #22ccff'],
        parsedVal
      ];
    }
  },
  _sessionSave: ({ key, val, storage }) => {
    if (!_.isObject(val)) {
      return [
        `→ (${storage}) %c${key} :%c ${val}`,
        'color: #22ccff', 'color: #bbb'
      ];
    } else {
      return [
        [`→ (${storage}) %c${key}`, 'color: #22ccff'],
        val
      ];
    }
  }
};


