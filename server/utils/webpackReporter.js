const _ = require('lodash');

module.exports = (config, sharedUtils, outputHeap) =>
  (mwStats, { state, stats, log, filename }) => {
    const { numCommas, padLeft, padRight, humanMemorySize } = sharedUtils;
    // compilation, hash, starttime
    // stats.compilation: hooks, options, profile, outputOptions, performance, chunks, chunkGroupos,
    // namedChunks, namedChunkGroups, modules, assets, name, fullHash, hash
    if (state) {
      const { compilation: { modules } } = stats;
      outputHeap(log);
      const duration = stats.endTime - stats.startTime;
      const fmtDuration = duration >= 1000 ? `${(duration / 1000).toFixed(1)}s` : `${duration}ms`;

      if (stats.hasErrors()) {
        stats.compilation.errors.forEach(se => log.error(`${se.message.replace(/\r\n/g, '')}`));
      } else if (stats.hasWarnings()) {
        stats.compilation.warnings.forEach(sw => log.warn(`${sw.message.replace(/\r\n/g, '')}`));
      }
      // dependencies, blocks, variables, resolveOptions, factoryMeta,  reasons, _chunks,
      // id, index, index2, depth, issuer, profile,  prefetched, built, used, resource, index, name
      // issuer: (parent module), sourceStr: js text, binary,

      const modInfo = {
        raw   : { deps: 0, mods: _.filter(modules, (mod) => mod.constructor.name === 'RawModule') },
        multi : { deps: 0, mods: _.filter(modules, (mod) => mod.constructor.name === 'MultiModule') },
        node  : { deps: 0, mods: _.filter(modules, ({ id }) => _.isString(id) && id.indexOf('./node_modules') === 0) },
        app   : { deps: 0, mods: _.filter(modules, ({ id }) => _.isString(id) && id.indexOf('./node_modules') !== 0) }
      };

      modInfo.app.mods.forEach((mod, i) => {
        modInfo.app.deps += mod.dependencies.length;
        if (!modInfo.app.maxDepth || modInfo.app.maxDepth < mod.depth) {
          modInfo.app.maxDepth = mod.depth;
        }

        mod.warnings.forEach(mw =>
          log.warn(`app-module warning: ${mw.name} ${mw.message.replace(/\n/g, '')} (${mw.origin})`)
        );
        mod.errors.forEach(me => log.error(me));

        const prefix = `(${mod.depth} ${mod.dependencies.length} ` +
          `deps ${mod.type.replace('javascript/', '')})`;

        if (config.showAppModulesBuild) {
          log.trace(
            `app-module ${padLeft(('#' + (i + 1)), 3)} ${padRight(prefix, 20)} => ${mod.id}` +
            (mod.useSourceMap ? ' (source-map)' : '') +
            (mod.buildMeta.moduleConcatenationBailout ? ` (bailout: ${mod.buildMeta.moduleConcatenationBailout})` : '')
          );
        }
      });

      modInfo.node.mods.forEach(mod => {
        modInfo.node.deps += mod.dependencies.length;
        if (!modInfo.node.maxDepth || modInfo.node.maxDepth < mod.depth) {
          modInfo.node.maxDepth = mod.depth;
        }
        // name, message, module, origin, originLoc, dependencies
        mod.warnings.forEach(mw =>
          log.warn(`node-module warning: ${mw.name} ${mw.message.replace(/\n/g, '')} (${mw.origin})`)
        );
        mod.errors.forEach(me => log.error(me));
        // TODO: implement silly level
        if (config.showNodeModulesBuild) {
          log.trace(`node-module (${mod.depth} ${mod.dependencies.length} deps) ${mod.rawRequest}`);
        }
      });

      // log.info(stats.toString(mwStats));
      const assets = Object.keys(stats.compilation.assets)
        .map(key => ({
          ...stats.compilation.assets[key],
          name: key,
          overLimit: stats.compilation.assets[key].isOverSizeLimit ? 'over-limit' : '',
          size: stats.compilation.assets[key].size()
        }));

      assets
        // .sort((a, b) => a.name > b.name)
        .forEach(asset => {
          if (asset.overLimit) {
            log.warn({ color: 'warn' },
              `${padRight(asset.name, 50)} %${humanMemorySize(asset.size)}%`);
          } else {
            log.trace({ color: 'bold' },
              `${padRight(asset.name, 50)} %${humanMemorySize(asset.size)}%`);
          }
        });

      log.info(
        `Built ${numCommas(modules.length)} modules into ${stats.compilation.chunks.length} chunks ` +
        `(app: ${modInfo.app.mods.length} mods / ${numCommas(modInfo.app.deps)} deps x` +
        `${modInfo.app.maxDepth}) (node_modules: ${numCommas(modInfo.node.mods.length)} mods / ` +
        `${numCommas(modInfo.node.deps)} deps x${modInfo.node.maxDepth})`
      );

      // EntryPoint { groupDebugId, name, chunks, origins, rumtimeChunk: { Chunk },
      // _children: { SortableSet }, _parents: {SortableSet}, _blocks: {SortableSet }
      // console.info(stats.compilation.chunkGroups, 'chunks');
      stats.compilation.chunkGroups.forEach(cg => {
        // console.info(cg.name, cg.runtimeChunk); // runtimeChunk
      });
      // Chunk: id, ids, debugId, name, entryModule: { _modules: MultiModule, _groups: SortableSet },
      // files, rendered, hash, contentHash, renderedHash, chunkReason, extraSync
      // console.info(stats.compilation.chunks, 'chunks');

      if (stats.hasErrors()) {
        log.info(`Failed to compile with ${stats.compilation.errors.length}`);
      } else if (stats.hasWarnings()) {
        log.info(`Compiled with ${stats.compilation.warnings.length} warnings in ${fmtDuration}`);
      } else {
        log.info(`Completed in ${fmtDuration}`);
      }
    } else {
      log.info(`Building ...`);
    }
  };