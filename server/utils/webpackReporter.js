const _ = require('lodash');

module.exports = (config, sharedUtils, outputHeap) =>
  (mwStats, buildStats) => {
    const { state, stats, log } = buildStats;
    const { numCommas, padLeft, padRight, humanMemorySize } = sharedUtils;
    if (state) {
      log.info('Building assets ...');
      const { compilation: { modules } } = stats;
      outputHeap(log);
      const duration = stats.endTime - stats.startTime;
      const fmtDuration = Number(duration) >= 1000
        ? `${(duration / 1000).toFixed(1)}s`
        : `${duration}ms`;

      if (stats.hasErrors()) {
        stats.compilation.errors.forEach(se => log.error(`${se.message.replace(/\r\n/g, '')}`));
      } else if (stats.hasWarnings()) {
        stats.compilation.warnings.forEach(sw => log.warn(`${sw.message.replace(/\r\n/g, '')}`));
      }
      const modInfo = {
        raw   : { deps: 0, mods: _.filter(modules, (mod) => mod.constructor.name === 'RawModule') },
        multi : { deps: 0, mods: _.filter(modules, (mod) => mod.constructor.name === 'MultiModule') },
        node  : { deps: 0, mods: _.filter(modules, ({ id }) => _.isString(id) && id.indexOf('./node_modules') === 0) },
        app   : { deps: 0, mods: _.filter(modules, ({ id }) => _.isString(id) && id.indexOf('./node_modules') !== 0) }
      };

      modInfo.app.mods.forEach((mod, i) => {
        const { dependencies, depth, buildMeta, type } = mod;
        modInfo.app.deps += dependencies.length;
        if (!modInfo.app.maxDepth || modInfo.app.maxDepth < depth) {
          modInfo.app.maxDepth = depth;
        }

        mod.warnings.forEach(mw => (
          log.warn(`app-module warning: ${mw.name} ${mw.message.replace(/\n/g, '')} (${mw.origin})`)
        ));
        mod.errors.forEach(me => log.error(me));

        const prefix = `(${depth} ${dependencies.length} deps ${type.replace('javascript/', '')})`;

        if (config.showAppModulesBuild) {
          log.trace([
            `    app-module ${padLeft((`#${i + 1}`), 3)}`,
            `${padRight(prefix, 20)} => ${mod.id}`,
            `${mod.useSourceMap ? ' (source-map)' : ''}`,
            `${buildMeta.moduleConcatenationBailout ? ` (bailout: ${buildMeta.moduleConcatenationBailout})` : ''}`
          ].join(' '));
        }
      });

      modInfo.node.mods.forEach(mod => {
        const { dependencies, depth, rawRequest } = mod;
        modInfo.node.deps += dependencies.length;
        if (!modInfo.node.maxDepth || modInfo.node.maxDepth < depth) {
          modInfo.node.maxDepth = depth;
        }

        // name, message, module, origin, originLoc, dependencies
        mod.warnings.forEach(mw =>
          log.warn(`node-module warning: ${mw.name} ${mw.message.replace(/\n/g, '')} (${mw.origin})`));

        mod.errors.forEach(me => log.error(me));
        // TODO: implement silly level
        if (config.showNodeModulesBuild) {
          log.trace(`node-module (${depth} ${dependencies.length} deps) ${rawRequest}`);
        }
      });

      // log.info(stats.toString(mwStats));
      const assets = Object.keys(stats.compilation.assets)
        .map(key => ({
          name: key,
          overLimit: !!stats.compilation.assets[key].isOverSizeLimit,
          size: stats.compilation.assets[key].size()
        }))
        .sort((a, b) => (a.size > b.size));

      const oversizeAssets = _.filter(assets, 'overLimit');

      let totalSize = 0;
      _.difference(assets, oversizeAssets).forEach(asset => {
        totalSize += asset.size;
        const logLevel = asset.name.split('.').pop() === 'js' ? 'debug' : 'trace';
        log[logLevel]({ _wpAsset: asset }, `${asset.name}: ${humanMemorySize(asset.size)}`);
      });

      _.sortBy(oversizeAssets, 'size').forEach(asset => {
        totalSize += asset.size;
        const logLevel = asset.size > 1000000 ? 'warn' : 'info';
        log[logLevel]({ _wpAsset: asset }, `${asset.name}: ${humanMemorySize(asset.size)}`);
      });

      const _wpDone = {
        modules: modules.length,
        chunks:  stats.compilation.chunks.length,
        size: totalSize,
        time: fmtDuration // duration
      };

      log.info({ _wpDone },
        `Built ${_wpDone.modules} modules into ${_wpDone.chunks} `
        + `chunks totaling ${humanMemorySize(totalSize)} in ${fmtDuration}`);

      log.debug(
        `    ${padRight('app:', 16)} ${padRight(`${modInfo.app.mods.length} modules`, 15)} `
        + ` ${numCommas(modInfo.app.deps)} dependenciess x${modInfo.app.maxDepth}`
      );

      log.debug(
        `    ${padRight('node_modules:', 16)} ${padRight(numCommas(`${modInfo.node.mods.length} modules`), 15)}`
        + ` ${numCommas(modInfo.node.deps)} dependencies x${modInfo.node.maxDepth}`
      );

      // stats.compilation.chunkGroups.forEach(cg => { console.info(cg.name, cg.runtimeChunk);  });

      if (stats.hasErrors()) {
        log.info(`Failed to compile with ${stats.compilation.errors.length}`);
      } else if (stats.hasWarnings()) {
        log.info(`Compiled with ${stats.compilation.warnings.length} warnings in ${fmtDuration}`);
      }
    } else {
      log.info('Webpack rebuild initiated');
    }
  };
