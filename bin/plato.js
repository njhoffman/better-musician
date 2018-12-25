#!/usr/bin/env node
/* eslint-disable no-console, import/no-extraneous-dependencies, import/no-dynamic-require */
// need forked version of es6-plato with up to date eslint dependencies

const _ = require('lodash');
const plato = require('es6-plato');
const path = require('path');
const appRoot = require('app-root-path');
const {
  statSync, mkdirSync, readdirSync, readFileSync
} = require('fs');

const lintRules = JSON.parse(readFileSync(`${appRoot}/.eslintrc`, { encoding: 'utf8' }));
const parsedRules = {
  ...lintRules,
  rules: _.omit(lintRules.rules, 'react/jsx-no-bind'),
  globals: _.keys(lintRules.globals)
};

// const initLogger = require(`${appRoot}/shared/logger/terminal`);
// const { warn, info, trace } = initLogger('plato-reports');
const { warn, info, info: trace } = console;

const testRun = true;
const reportsDir = testRun ? '~/tmp/plato' : `${appRoot}/reports/plato`;
const srcFiles = `${appRoot}/src`;
const serverFiles = `${appRoot}/server`;
const outputDir = path.join(reportsDir, `${Date.now()}`);

info(`Initializing plato reports for output to: ${outputDir}`);
info(`Crawling the  ${serverFiles} and ${srcFiles} directories for js/jsx files`);

const ignoredFiles = [
  // '/src/routes/index.js',
  // '/src/routes/Songs/index.js',
  // '/src/routes/Settings/index.js',
  // '/src/routes/Stats/index.js',
  // '/src/routes/Reset/index.js',
  // '/src/routes/Fields/index.js',
  // '/src/routes/Login/index.js',
  // '/src/routes/Profile/index.js',
  // '/src/routes/Register/index.js'
];

const mkdir = (dirPath) => {
  try {
    mkdirSync(dirPath);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e;
    }
  }
};

const walkSync = (dir, files = []) => {
  readdirSync(dir).forEach(file => {
    /* eslint-disable no-param-reassign */
    files = statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), files)
      : files.concat(path.join(dir, file));
    /* eslint-enable no-param-reassign */
  });
  return files;
};

const startTime = new Date().getTime();

let fileList = [].concat(
  walkSync(srcFiles),
  walkSync(serverFiles)
);

fileList = fileList.filter(file => {
  const ext = file.split('.').pop();
  let isIgnored = false;
  ignoredFiles.forEach(igFile => {
    if (file.indexOf(igFile) !== -1) {
      isIgnored = true;
    }
  });
  return (!isIgnored && (ext === 'js' || ext === 'jsx'));
});

info(`Found ${fileList.length} files to process.`);
fileList.forEach((file, idx) => console.log(`\t${idx}: ${file}`));

const platoFinished = (reports) => {
  const elapsed = (new Date().getTime() - startTime) / 1000;
  info('\n----------------------------\n');
  info(`Generated plato reports for ${fileList.length} files in ${elapsed} seconds`);
  //
  // complexity [ 'methodAggregate', 'settings', 'classes', 'dependencies', 'errors', 'filePath', 'lineEnd',
  //   'lineStart', 'maintainability', 'methods', 'methodAverage', 'srcPath', 'srcPathAlias',
  //   'module', 'aggregate', 'functions' ]

  reports.forEach((report, i) => {
    const {
      info: { file },
      // complexity,
      eslint: { messages }, // severity, line, colmn, message, fix
    } = report;

    if (messages.length > 0) {
      warn(`\t${file.replace(appRoot, '')}`);
    } else {
      trace(`\t${file.replace(appRoot, '')} : clean`);
    }

    messages.forEach(({ severity, line, column, message }) => (
      warn(`    ${severity.toUpperCase()}    ${line || 'XX'}:${column || 'XX'}     ${message}`)
    ));
  });

  const { summary: { total, average } } = plato.getOverviewReport(reports);

  info(
    '\n'
    + `Total ${total.eslint} es-lint errors with ${total.sloc}`
    + ` total lines of code and ${total.maintainability} maintainability`
  );

  info(
    `Average: ${average.eslint} es-lint errors with ${average.sloc}`
    + ` average lines per file and ${average.maintainability} maintainability per file.\n\n`
  );
};

if (!testRun) {
  mkdir(outputDir);
}

const platoOptions = {
  title: `Plato Report - ${new Date().toLocaleString()}`,
  eslint: parsedRules
};

plato.inspect(fileList, outputDir, platoOptions, platoFinished);

/* eslint-enable no-console, import/no-extraneous-dependencies, import/no-dynamic-require */
