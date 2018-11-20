const _ = require('lodash');
const { padRight } = require('../util');

const ignoredActions = ['@@redux-form/BLUR', '@@redux-form/CHANGE', '@@redux-form/FOCUS'];
module.exports = {
  _action: (action) => {
    if (ignoredActions.indexOf(action.type) !== -1) {
      return '';
    } else if (action.callApi) {
      const method = action.method || 'GET';
      const retMsg = [
        `%cCALL_API %c ${padRight(method, 4)} %c ${action.endpoint} `,
        'color: #00ccff; font-weight: bold;',
        'color: #22ccff;',
        'color: #88aaff;'
      ];
      return retMsg;
    } else if (!_.isUndefined(action.payload)) {
      const retMsg = [
        `%c${padRight(action.type, 30)} `
        + `%c ${!_.isUndefined(action.meta) ? JSON.stringify(action.meta) : ''}`
        + `%c ${JSON.stringify(action.payload)} `,
        // 'color: #4499bb; bold;',
        'color: #6699cc; font-weight: bold;',
        'color: #446688;',
        'color: #666677;'
      ];
      return retMsg;
    }
    return [
      `%c${padRight(action.type)}`,
      'color: #6699cc; font-weight: bold;'
      // 'color: #88aaff;'
    ];
  },
  _sessionGet: ({ key, parsedVal, storage }) => {
    if (!_.isObject(parsedVal)) {
      return [
        `← (${storage}) %c${key} :%c ${parsedVal}`,
        'color: #22ccff', 'color: #bbb'
      ];
    }
    return [
      [`← (${storage}) : %c${key}`, 'color: #22ccff'],
      parsedVal
    ];
  },
  _sessionSave: ({ key, val, storage }) => {
    if (!_.isObject(val)) {
      return [
        `→ (${storage}) %c${key} :%c ${val}`,
        'color: #22ccff', 'color: #bbb'
      ];
    }
    return [
      [`→ (${storage}) %c${key}`, 'color: #22ccff'],
      val
    ];
  }
};
