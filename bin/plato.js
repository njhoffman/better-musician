#!/usr/bin/env node
/* eslint-disable no-console, import/no-extraneous-dependencies, import/no-dynamic-require */
// need forked version of es6-plato with up to date eslint dependencies

const plato = require('es6-plato');
const path = require('path');
const appRoot = require('app-root-path');
const {
  statSync, mkdirSync, readdirSync, readFileSync
} = require('fs');

const lintRules = readFileSync(`${appRoot}/.eslintrc`, { encoding: 'utf8' });

const initLogger = require(`${appRoot}/shared/logger/terminal`);
const { warn, info, trace } = initLogger('plato-reports');

const reportsDir = `${appRoot}/reports/plato`;
const srcFiles = `${appRoot}/src`;
const serverFiles = `${appRoot}/server`;
const outputDir = path.join(reportsDir, `${Date.now()}`);

info(`Initializing plato reports for output to: ${outputDir}`);
info(`Crawling the  ${serverFiles} and ${srcFiles} directories for js/jsx files`);

const platoOptions = {
  title: `Plato Report - ${new Date().toLocaleString()}`,
  eslint: lintRules
};

const ignoredFiles = [
  '/src/routes/index.js',
  '/src/routes/Songs/index.js',
  '/src/routes/Settings/index.js',
  '/src/routes/Stats/index.js',
  '/src/routes/Reset/index.js',
  '/src/routes/Fields/index.js',
  '/src/routes/Login/index.js',
  '/src/routes/Profile/index.js',
  '/src/routes/Register/index.js'
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

let fileList = walkSync(srcFiles);

fileList = walkSync(serverFiles, fileList);

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

trace({ fileList }, 'File locations to process...');

const platoFinished = (reports) => {
  const elapsed = (new Date().getTime() - startTime) / 1000;
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
      warn(`${file.replace(appRoot, '')}`);
    } else {
      trace(`${file.replace(appRoot, '')} : clean`);
    }

    messages.forEach(({ severity, line, column, message }) => (
      warn(`    ${severity.toUpperCase()}    ${line || 'XX'}:${column || 'XX'}     ${message}`)
    ));
  });

  const { summary: { total, average } } = plato.getOverviewReport(reports);

  info(
    `Total ${total.eslint} es-lint errors with ${total.sloc}`
    + ` total lines of code and ${total.maintainability} maintainability`
  );

  info(
    `Average: ${average.eslint} es-lint errors with ${average.sloc}`
    + ` average lines per file and ${average.maintainability} maintainability per file.`
  );
};

mkdir(outputDir);
plato.inspect(fileList, outputDir, platoOptions, platoFinished);

/* eslint-enable no-console, import/no-extraneous-dependencies, import/no-dynamic-require */
