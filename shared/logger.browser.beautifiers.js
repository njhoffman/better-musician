const _ = require('lodash');
const { padRight } = require('./util');

module.exports = {
  _action: (action) => {
    if (['@@redux-form/BLUR', '@@redux-form/CHANGE', '@@redux-form/FOCUS'].indexOf(action.type) !== -1) {
      return '';
    } else if (action.callApi) {
      return [
        `%c${padRight('CALL_API', 30)} %c ${JSON.stringify(action)}`,
        'color: #aaaaff;', 'color: #8866aa;'
      ];
    } else if (action.payload) {
      return [
        `%c${padRight(action.type, 30)} %c ${JSON.stringify(action.payload)}`,
        'color: #8888ff;', 'color: #8866aa;'
      ];
    } else {
      return [
        `%c${padRight(action.type)}`,
        'color: #8888ff;'
      ];
    }
  },
  _sessionGet: ({ key, parsedVal, storage }) => {
    if (!_.isObject(parsedVal)) {
      return [
        `Get from ${storage}: %c${key} :%c ${parsedVal}`,
        'color: cyan', 'color: white'
      ];
    } else {
      return [
        [`Get from ${storage}: %c${key}`, 'color: cyan'],
        parsedVal
      ];
    }
  },
  _sessionSave: ({ key, val, storage }) => {
    if (!_.isObject(val)) {
      return [
        `Save to ${storage}: %c${key} :%c ${val}`,
        'color: cyan', 'color: white'
      ];
    } else {
      return [
        [`Save to ${storage}: %c${key}`, 'color: cyan'],
        val
      ];
    }
  }
};


