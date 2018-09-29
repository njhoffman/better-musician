//  enable runtime transpilation to use ES6/7 in node

var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

/* eslint-disable no-console */
try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}
/* eslint-enable no-console */

require('@babel/register')(config);
