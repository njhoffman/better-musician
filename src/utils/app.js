import _ from 'lodash';
import { humanMemorySize } from 'shared/util';
import { init as initLog } from 'shared/logger';

const { debug, error } = initLog('app');

let lastHeapSize = 0;
export const startMemoryStats = (interval = 10000) => {
  const memoryStats = () => {
    if (window.performance && window.performance.memory) {
      const { totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
      const used = humanMemorySize(usedJSHeapSize, true);
      const total = humanMemorySize(totalJSHeapSize, true);
      if (Math.abs(usedJSHeapSize - lastHeapSize) > 10485760) {
        debug(`-- JS Heap Size: ${used} / ${total}`);
        lastHeapSize = usedJSHeapSize;
      }
    }
  };
  setTimeout(memoryStats, interval);
};

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

