/* eslint-disable no-console */

const async = require('async');
const chalk = require('chalk');
const path = require('path');
const { argv } = require('yargs');
// const { writeFileSync } = require('fs');

const { commitSummary, fileDiff, dependencyDiff } = require('./git');
const { mdHeader, mdChanges, mdSummary, mdBody, mdDependencies } = require('./changelog.templates');
const { version: currVersion }  = require('../package.json');

const isMajorVersion = Object.keys(argv).some(arg => /major|--major/i.test(arg));
const getMdPath = (name) => path.resolve(__dirname, `../docs/changelogs/${name}.md`);
const trunkPath = getMdPath('trunk');

const getVersionInfo = (done) => {
  const lastVersion = currVersion.replace(/\.\d+$/, '.0');
  const nextVersion = (
    isMajorVersion ? [
      `${(parseInt(lastVersion.split('.')[0], 10) + 1)}`,
      '0',
      '0'
    ] : [
      `${currVersion.split('.')[0]}`,
      `${(parseInt(lastVersion.split('.')[1], 10) + 1)}`,
      '0'
    ]
  ).join('.');
  done(null, { lastVersion, nextVersion });
};

const getData = ({ lastVersion, nextVersion }, allDone) => {
  console.log(
    `\nProcessing changes from ${chalk.cyan(lastVersion)} to ${chalk.cyan(nextVersion)}`
  );
  async.series({
    commits: (done) => commitSummary(lastVersion, currVersion, done),
    summary: (done) => fileDiff(lastVersion, done),
    dependencies: (done) => dependencyDiff(lastVersion, done),
    versions: (done) => done(null, { lastVersion, nextVersion })
  }, allDone);
};

const generateMarkdown = ({ summary, commits, dependencies, versions }, allDone) => {
  const { nextVersion, lastVersion } = versions;
  const plato = { lines: 3840, files: 251, sloc: 132, maint: 75.10 };

  console.log([
    '  -- Got results with',
    `${chalk.bold(commits.total)} commits,`,
    `${chalk.bold(Object.keys(dependencies.prod).length)} production dependencies`,
    `${chalk.bold(Object.keys(dependencies.dev).length)} development dependencies`
  ].join(' '));

  const markdown = [
    mdHeader(nextVersion),
    mdChanges(lastVersion, summary),
    mdSummary(plato),
    mdBody(trunkPath),
    mdDependencies(dependencies)
  ].join('\n\n');

  console.log(
    `  -- Generated ${chalk.bold(markdown.length)} lines of markdown`
  );

  allDone(null, { markdown, nextVersion });
};

const writeFiles = ({ markdown, nextVersion }, allDone) => {
  const mdPath = getMdPath(nextVersion);
  console.log(`  -- Writing markdown to file: ${mdPath}`);
  console.log(`  -- Resetting trunk file: ${trunkPath}`);
  allDone(null, markdown);
};

async.waterfall([
  getVersionInfo,
  getData,
  generateMarkdown,
  writeFiles
], (err, results) => {
  console.log(results);
  console.log('\n\n');
});

/* eslint-enable no-console */
