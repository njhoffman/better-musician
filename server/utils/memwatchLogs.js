const memwatch = require('memwatch-next');

let sUtils;
let hd = new memwatch.HeapDiff();

const heapDiff = (logger) => {
  const { numCommas } = sUtils;
  // heapDiff
  const heapDiff = hd.end();
  logger.info(
    { color: ['webpackMemoryLabel', 'webpackMemoryValue'] },
    `%Heap Diff:%\t%${heapDiff.change.size}%   ` +
    `(${heapDiff.before.size} - ${heapDiff.after.size})   ` +
    `(Nodes Added: ${numCommas(parseInt(heapDiff.change.allocated_nodes) - parseInt(heapDiff.change.freed_nodes))})`
  );

  // don't show heap objects under 100kb
  const heapObjs = heapDiff.change.details
    .filter(ho => parseInt(ho.size_bytes) > 102400)
    .sort((a, b) => (parseInt(b.size_bytes) - parseInt(a.size_bytes)));

  let maxClassLength = heapObjs.reduce((acc, curr) =>
    curr.what.length > acc ? curr.what.length : acc, 0);

  heapObjs.forEach((diffItem, i) => {
    // what, size_bytes, size, +, -
    const spaces = Array(maxClassLength + 1 - diffItem.what.length).join(' ');
    logger.info({ color: 'webpackDetailMemoryValue' },
      ` ${diffItem.what} ${spaces} %${sUtils.padLeft(diffItem.size, 9)}%`
    );
  });
  hd = new memwatch.HeapDiff();
};

const heap = (config, sdc, logger) => {
  const { humanMemorySize: hms } = sUtils;
  const memoryMap = {
    heapTotal: 'Heap Total:',
    heapUsed: 'Heap Used:',
    rss: 'RSS:',
    external: 'External:'
  };
  Object.keys(memoryMap).forEach(memoryKey => {
    const memoryAmount = process.memoryUsage()[memoryKey]
      ? hms(process.memoryUsage()[memoryKey], true) : false;
    if (memoryAmount) {
      logger.info(
        { color: ['webpackMemoryLabel', 'webpackMemoryValue'] },
        `  %${memoryMap[memoryKey]}%\t%${memoryAmount}%`
      );
      sdc.gauge(`app_memory_${memoryKey}`, memoryAmount);
    }
  });
  if (config.showHeapDiff) {
    heapDiff(logger);
  }
};

const stats = (logger, memStats) => {
  const { padZeros, humanMemorySize: hms, padLeft } = sUtils;
  logger.debug(
    `GC (#${padZeros(memStats.num_full_gc, 3)}/${padZeros(memStats.num_inc_gc, 3)}): ` +
    `${padLeft(hms(memStats.current_base, true), 9)} (Current) ` +
    `${padLeft(hms(memStats.estimated_base, true), 9)} (Estimated) ` +
    `Usage: ${memStats.usage_trend}`
  );
};

const leak = (sdc, logger, memInfo) => {
  const { humanMemorySize } = sUtils;
  const bph = memInfo.reason.match(/(\d+) bytes\/hr/)[1];
  logger.warn(
    `Memory Leak: (+${humanMemorySize(memInfo.growth)}) ` +
    `${memInfo.reason.replace(`${bph} bytes/hr`, '')} ${humanMemorySize(bph)} bytes/hr`
  );
  sdc.gauge(`app_memory_leak`, memInfo.growth);
};

module.exports = ({ config, sdc, logger, sharedUtils }) => {
  sUtils = sharedUtils;
  return {
    leak:  (memInfo) => leak(sdc, logger, memInfo),
    stats: (statsInfo) => stats(logger, statsInfo),
    heap:  () => heap(config, sdc, logger)
  };
};
