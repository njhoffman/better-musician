const memwatch = require('node-memwatch');

let sUtils;
let hd = new memwatch.HeapDiff();

const showHeapDiff = (logger) => {
  const { numCommas } = sUtils;
  const { before, after, change } = hd.end();
  const nodesAdded = parseInt(change.allocated_nodes, 10) - parseInt(change.freed_nodes, 10);
  logger.info(
    { color: ['webpackMemoryLabel', 'webpackMemoryValue'] }, [
      `%Heap Diff:%\t%${change.size}%`,
      `(${before.size} - ${after.size})`,
      `(Nodes Added: ${numCommas(nodesAdded)}`
    ].join('   ')
  );

  const sortByHeapSize = ({ size_bytes: aBytes }, { size_bytes: bBytes }) =>
    (parseInt(bBytes, 10) - parseInt(aBytes, 10));


  // don't show heap objects under 100kb
  const heapObjs = change.details
    .filter(ho => parseInt(ho.size_bytes, 10) > 102400)
    .sort(sortByHeapSize);

  const maxClassLength = heapObjs.reduce((acc, curr) =>
    (curr.what.length > acc ? curr.what.length : acc), 0);

  heapObjs.forEach((diffItem, i) => {
    // what, size_bytes, size, +, -
    const spaces = Array(maxClassLength + 1 - diffItem.what.length).join(' ');
    logger.info({ color: 'webpackDetailMemoryValue' },
      ` ${diffItem.what} ${spaces} %${sUtils.padLeft(diffItem.size, 9)}%`);
  });
  hd = new memwatch.HeapDiff();
};

const heap = (config, sdc, logger) => {
  const { humanMemorySize: hms } = sUtils;
  const memoryMap = {
    external: 'External:\t',
    rss: 'RSS:\t',
    heapUsed: 'Heap Used:',
    heapTotal: 'Heap Total:'
  };
  Object.keys(memoryMap).forEach(memoryKey => {
    const memoryAmount = process.memoryUsage()[memoryKey];
    let memoryColor = ['webpackMemoryLabel', 'webpackMemoryValue'];
    if (memoryAmount) {
      if (memoryAmount > 1073741824) {
        memoryColor = memoryAmount > 2147483648
          ? ['webpackMemoryLabelSevere', 'webpackMemoryValueSevere']
          : ['webpackMemoryLabelWarn', 'webpackMemoryValueWarn'];
      }
      logger.info(
        { color: memoryColor },
        `  %${memoryMap[memoryKey]}%\t%${hms(memoryAmount, true)}%`
      );
      sdc.gauge(`app_memory_${memoryKey}`, memoryAmount);
    }
  });
  if (config.showHeapDiff) {
    showHeapDiff(logger);
  }
};

const stats = (logger, memStats) => {
  const { padZeros, humanMemorySize: hms, padLeft } = sUtils;
  logger.debug(
    `GC (#${padZeros(memStats.num_full_gc, 3)}/${padZeros(memStats.num_inc_gc, 3)}): `
    + `${padLeft(hms(memStats.current_base, true), 9)} (Current) `
    + `${padLeft(hms(memStats.estimated_base, true), 9)} (Estimated) `
    + `Usage: ${memStats.usage_trend}`
  );
};

const leak = (sdc, logger, memInfo) => {
  const { humanMemorySize } = sUtils;
  const bphMatch = memInfo.reason.match(/(\d+) bytes\/hr/);
  const bph = bphMatch && bphMatch.length > 0 ? bphMatch[1] : '???';
  logger.warn(
    `Memory Leak: (+${humanMemorySize(memInfo.growth)}) `
    + `${memInfo.reason.replace(`${bph} bytes/hr`, '')} ${humanMemorySize(bph)} bytes/hr`
  );
  sdc.gauge('app_memory_leak', memInfo.growth);
};

module.exports = ({ config, sdc, logger, sharedUtils }) => {
  sUtils = sharedUtils;
  return {
    leak:  (memInfo) => leak(sdc, logger, memInfo),
    stats: (statsInfo) => stats(logger, statsInfo),
    heap:  () => heap(config, sdc, logger)
  };
};
