const { readFileSync } = require('fs');

const getDate = () => new Date().toLocaleDateString('en-US', {
  month: 'short', day: 'numeric', year: 'numeric'
});

const mdHeader = (nextVersion) => [
  `## ${nextVersion}`,
  `**${getDate()}**`,
].join('\n');

const mdChanges = (lastVersion, { insertions, deletions, files }) => [
  `**Changes from ${lastVersion}**`,
  '',
  '| Patches | Commits | Files | Insertions | Deletions |',
  '|:-------:|:-------:|:-----:|:----------:|:---------:|',
  `| -- | -- | ${files.length} | ${insertions} | ${deletions} |`,
].join('\n');

const mdSummary = ({ lines, files, sloc, maint }) => [
  '**Project Summary**',
  '',
  '| Total Lines | Total Files | Lines / File | Maintainability |',
  '|:-----------:|:-----------:|:------------:|:---------------:|',
  `| ${lines} | ${files} | ${sloc} | ${maint} |`,
].join('\n');

const mdBody = (mdFile) => {
  let bodyOut = '';
  const newSection = [];
  const contents = readFileSync(mdFile, { encoding: 'utf8' });
  contents.split('\n').forEach(line => {
    if (/^\s*###/.test(line)) {
      bodyOut += newSection.filter(Boolean).length > 1
        ? `\n${newSection.join('\n')}` : '';
      newSection.splice(0);
      newSection.push(line);
    } else if (newSection.length > 0) {
      newSection.push(line);
    }
  });
  return bodyOut;
};

const mdDependency = (title, deps) => [
  '<details>',
  `<summary>${title} (click to see list)</summary>`,
  '<p>',
  '',
  '| Package Name | Operation | Source Version | Target Version |',
  '|:------------:|:---------:|:--------------:|:--------------:|',
  Object.keys(deps)
    .map(name => `| ${name} | ${deps[name].join(' | ')} |`)
    .join('\n'),
  '',
  '</p>',
  '</details>',
].join('\n');

const mdDependencies = (dependencies) => [
  mdDependency('Core Dependency Updates', dependencies.prod),
  '',
  mdDependency('Development Dependency Updates', dependencies.dev)
].join('\n');

module.exports = {
  mdHeader,
  mdChanges,
  mdSummary,
  mdBody,
  mdDependencies,
};
