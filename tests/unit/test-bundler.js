// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

// ---------------------------------------
// Require Tests
// ---------------------------------------

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/);

// When a test file changes, only rerun that spec file. If something outside of a
// test file changed, rerun all tests.
// https://www.npmjs.com/package/karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = [];
const allTests = testsContext.keys();
const changedTests = allTests.filter(path => {
  return __karmaWebpackManifest__.indexOf(path) !== -1;
})

;(changedTests.length ? changedTests : allTests).forEach(testsContext);

// require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
if (__COVERAGE__) {
  const componentsContext = require.context('../../src/', true, /^((?!main|interfaces).)*\.js$/);
  componentsContext.keys().forEach(componentsContext);
}
