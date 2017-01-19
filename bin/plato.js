#!/usr/bin/env node

const plato = require('plato');
const fs = require('fs');
const path = require('path');

const reportsDir = __dirname + '/../reports/plato';
const srcFiles = __dirname + '/../src';
const serverFiles = __dirname + '/../server';
const outputDir = reportsDir + '/' + Date.now();

var platoOptions = {
  title: 'Plato Report'
};

const mkdirSync = (path) => {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
  return filelist;
}

const platoFinished = (report) => {
  console.log("\n\n**** PLATO REPORT ***\n\n");
  console.log(report);
  console.log("\n\n**** PLATO REPORT ***\n\n");
};

let fileList = walkSync(srcFiles);
fileList = walkSync(serverFiles, fileList);
fileList = fileList.filter(file => {
  const ext = file.split('.').pop();
  return ((ext === "js" || ext === "jsx") && ! /redux-orm/.test(file));
});

console.log(fileList.length);
mkdirSync(outputDir);
plato.inspect(fileList, outputDir, platoOptions, platoFinished);
