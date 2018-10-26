#!/usr/bin/env node
/* eslint-disable no-console */

const plato = require('es6-plato');
const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, '/../reports/plato');
const srcFiles = path.join(__dirname, '/../src');
const serverFiles = path.join(__dirname, '/../server');
const outputDir = path.join(reportsDir, `/${Date.now()}`);

const platoOptions = {
  title: 'Plato Report'
};

const mkdirSync = (path) => {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
};

const walkSync = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    fileList = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), fileList)
      : fileList.concat(path.join(dir, file));
  });
  return fileList;
};

const platoFinished = (report) => {
  console.log('\n\n**** PLATO REPORT ***\n\n');
  console.log(report);
  console.log('\n\n**** PLATO REPORT ***\n\n');
};

let fileList = walkSync(srcFiles);
fileList = walkSync(serverFiles, fileList);
fileList = fileList.filter(file => {
  const ext = file.split('.').pop();
  return ((ext === 'js' || ext === 'jsx') && !/redux-orm/.test(file));
});

console.log(fileList.length);
mkdirSync(outputDir);
plato.inspect(fileList, outputDir, platoOptions, platoFinished);
/* eslint-enable no-console */
