import _ from 'lodash';
import flatten from 'flat';
import { humanMemorySize } from 'shared/util';
import { init as initLog } from 'shared/logger';

const { error } = initLog('app');

let lastHeapSize = 0;

const memoryStats = () => {
  if (window.performance && window.performance.memory) {
    const { totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
    const used = humanMemorySize(usedJSHeapSize, true);
    const total = humanMemorySize(totalJSHeapSize, true);
    if (Math.abs(usedJSHeapSize - lastHeapSize) > 10485760) {
      // debug(`-- JS Heap Size: ${used} / ${total}`);
      lastHeapSize = usedJSHeapSize;
    }
    return { used, total };
  }
  return false;
};

export const startMemoryStats = (interval = 10000) => setTimeout(memoryStats, interval);

export const domStats = () => {
  const stats = { maxDepth: 0, totalNodes: 0, totalDepth: 0 };
  const getNodeStats = (el, depth) => {
    stats.maxDepth = depth > stats.maxDepth ? depth : stats.maxDepth;
    stats.totalNodes += 1;
    stats.totalDepth += depth;
    let i;
    for (i = 0; i < el.children.length; i += 1) {
      getNodeStats(el.children[i], depth + 1);
    }
  };
  getNodeStats(document, 0);
  stats.averageDepth = parseFloat((stats.totalDepth / stats.totalNodes).toFixed(2));
  return stats;
};

window.domStats = domStats;

const customizer = (baseValue, value) => {
  if (Array.isArray(baseValue) && Array.isArray(value)) {
    return _.isEqual(baseValue.sort(), value.sort());
  }
  return _.isEqual(baseValue, value);
};

/* eslint-disable no-param-reassign */
// TODO: i guess try to figure something out
export const difference = (primaryObject, primaryBase) => {
  const changes = (object, base) => (
    _.transform(object, (result, value, key) => {
      if (!_.isEqualWith(value, _.get(base, key), customizer)) {
        result[key] = (_.isObject(value) && _.isObject(base[key]))
          ? changes(value, base[key])
          : value;
      }
    })
  );
  return changes(primaryObject, primaryBase);
};
/* eslint-enable no-param-reassign */

export const onError = (err, { componentStack }, props) => {
  error(`Application Error: ${err.name} ${componentStack.split('\n')[0]}`);
  // error.framesToPop
  // componentStack.split('\n').forEach((cs, i) => {
  //   error(`(${i}) ${cs}`);
  // });
  /* eslint-disable no-console */
  console.error(err, `Propkeys: ${Object.keys(props).join(', ')}`);
  /* eslint-enable no-console */
};

const memorySizeOf = (obj) => {
  let bytes = 0;

  /* eslint-disable no-case-declarations, no-restricted-syntax, no-prototype-builtins, no-continue */
  const sizeOf = (childObj) => {
    if (childObj !== null && childObj !== undefined) {
      switch (typeof childObj) {
        case 'number':
          bytes += 8;
          break;
        case 'string':
          bytes += childObj.length * 2;
          break;
        case 'boolean':
          bytes += 4;
          break;
        case 'object':
          const objClass = Object.prototype.toString
            .call(childObj).slice(8, -1);

          if (objClass === 'Object' || objClass === 'Array') {
            for (const key in childObj) {
              if (!childObj.hasOwnProperty(key)) {
                continue;
              }
              sizeOf(childObj[key]);
            }
          } else {
            bytes += childObj.toString().length * 2;
          }
          break;
        default:
          bytes += 0;
          break;
      }
    }
    return bytes;
  };

  return humanMemorySize(sizeOf(obj));
};

export const getStateStats = (currState) => {
  const stateFlat = flatten(currState);
  const stateFields = {};

  Object.keys(stateFlat).forEach(fieldKey => {
    const base = fieldKey
      .split('.')
      .slice(0, -1)
      .join('.');
    stateFields[base] = !stateFields[base] ? 1 : stateFields[base] + 1;
  });

  return {
    keys:       Object.keys(stateFields).length,
    primitives: Object.keys(stateFlat).length,
    size:       memorySizeOf(currState)
  };
};

export const getClientStats = () => ({
  // maxDepth, totalNodes, totalDepth, averageDepth
  dom: domStats(),
  memory: memoryStats()
});
