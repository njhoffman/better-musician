## [Trunk]
<details><summary>Unreleased version notes (click to see more)</summary>
<p>

### Features
### Fixes
### Other
### Documentation

</p>
</details>

## 1.1.0
**(October 31, 2018)**

### Features

* Completed migration with all dependencies updated from 1+ year old packages including new babel, eslint, and mocha tests configuration.
* Consolidated structure of route layouts and handling for scalable and consistent growth of the API.
* Established base model functionality to wrap table definitions (such as users, songs) into instantiated models with common CRUD, validation, and error handling utilities.

### Fixes

* All previous linter errors resolved with eslint rules based on airbnb guidelines.
* All Material-UI based components and field builders upgraded from v1 to v3 with new properties and implementation


### Other

### Documentation

* Start CHANGELOG.md with basic layout of future updates.

<details><summary> Core Dependencies (click to see list)</summary>
<p>

* @babel/register:                       ^7.0.0
* @babel/runtime:                        ^7.1.2
* @material-ui/core:                     ^3.3.2
* @material-ui/icons:                    ^3.0.1
* @material-ui/lab:                      ^3.0.0-alpha.22
* better-npm-run:                        ^0.1.1
* browser-cookies:                       ^1.2.0
* bunyan:                                ^1.8.12
* circular-dependency-plugin:            ^5.0.2
* classnames:                            ^2.2.6
* compression:                           ^1.7.3
* connect-history-api-fallback:          ^1.5.0
* connected-react-router:                ^4.5.0
* cookie:                                ^0.3.1
* cookie-parser:                         ^1.4.3
* cosmos:                                ^0.1.2
* debug:                                 ^4.1.0
* devui:                                 ^1.0.0-3
* downshift:                             ^2.2.3
* emotion:                               ^9.2.12
* es6-promise:                           ^4.2.5
* express:                               ^4.16.4
* express-request-id:                    ^1.4.1
* express-useragent:                     ^1.0.12
* extend:                                ^3.0.2
* foundation-sites:                      ^6.5.0
* fs-extra:                              ^7.0.0
* geoip-lite:                            ^1.3.2
* history:                               ^4.4.1
* html-webpack-plugin:                   ^3.2.0
* http-proxy:                            ^1.17.0
* imports-loader:                        ^0.8.0
* ip:                                    ^1.1.4
* isomorphic-fetch:                      ^2.2.1
* jsonwebtoken:                          ^8.3.0
* lodash:                                ^4.17.11
* mini-css-extract-plugin:               ^0.4.4
* node-memwatch:                         git+https://github.com/eduardbcom/node-memwatch.git
* node-statsd:                           ^0.1.1
* normalize.css:                         ^8.0.0
* prettyjson-256:                        ^1.5.18
* prop-types:                            ^15.6.2
* react:                                 ^16.6.0
* react-cosmos-background-proxy:         ^1.0.1
* react-cosmos-redux-proxy:              ^4.6.1
* react-cosmos-router-proxy:             ^4.6.1
* react-device-detect:                   ^1.6.1
* react-dom:                             ^16.6.0
* react-foundation:                      ^0.9.6
* react-icons:                           ^3.2.2
* react-loadable:                        ^5.5.0
* react-onclickoutside:                  ^6.7.1
* react-pure-render:                     ^1.0.2
* react-redux:                           ^5.1.0
* react-router:                          ^4.1.0
* react-router-dom:                      ^4.1.0
* react-router-redux:                    ^5.0.0-alpha.6
* react-spinners:                        ^0.4.7
* react-tappable:                        ^1.0.4
* redbox-react:                          ^1.6.0
* redux:                                 ^4.0.1
* redux-auth-wrapper:                    ^2.0.3
* redux-devtools:                        ^3.4.1
* redux-devtools-chart-monitor:          git+https://github.com/njhoffman/redux-devtools-chart-monitor.git
* redux-devtools-dock-monitor:           ^1.1.3
* redux-devtools-filterable-log-monitor: ^0.8.0
* redux-devtools-inspector:              git+https://github.com/njhoffman/redux-devtools-inspector.git
* redux-devtools-log-monitor:            ^1.4.0
* redux-devtools-slider-monitor:         ^1.0.0-beta-1
* redux-devtools-themes:                 ^1.0.0
* redux-form:                            ^7.4.2
* redux-freeze:                          ^0.1.7
* redux-mock-store:                      ^1.5.3
* redux-orm:                             0.12.1
* redux-slider-monitor:                  ^2.0.0-1
* redux-thunk:                           ^2.3.0
* reselect:                              ^4.0.0
* response-time:                         ^2.3.2
* style-loader:                          ^0.23.1
* typeface-roboto:                       0.0.54
* uglifyjs-webpack-plugin:               ^2.0.1
* useragent:                             ^2.3.0
* uuid:                                  ^3.3.2
* validator:                             ^10.8.0
* webpack:                               ^4.23.1
* webpack-bundle-analyzer:               ^3.0.3
* webpack-dev-middleware:                ^3.4.0
* webpack-hot-middleware:                ^2.24.3
* whatwg-fetch:                          ^3.0.0
* yargs:                                 ^12.0.2
</p>
</details>

<details><summary> Development Dependencies (click to see list)</summary>
<p>

*	@babel/cli:                                   ^7.0.0
* @babel/core:                                  ^7.0.0
* @babel/plugin-proposal-class-properties:      ^7.0.0
* @babel/plugin-proposal-decorators:            ^7.0.0
* @babel/plugin-proposal-export-namespace-from: ^7.0.0
* @babel/plugin-proposal-function-sent:         ^7.0.0
* @babel/plugin-proposal-json-strings:          ^7.0.0
* @babel/plugin-proposal-numeric-separator:     ^7.0.0
* @babel/plugin-proposal-throw-expressions:     ^7.0.0
* @babel/plugin-syntax-decorators:              ^7.0.0
* @babel/plugin-syntax-dynamic-import:          ^7.0.0
* @babel/plugin-syntax-import-meta:             ^7.0.0
* @babel/plugin-transform-react-display-name:   ^7.0.0
* @babel/plugin-transform-react-jsx-source:     ^7.0.0
* @babel/polyfill:                              ^7.0.0
* @babel/preset-env:                            ^7.0.0
* @babel/preset-react:                          ^7.0.0
* babel-eslint:                                 ^10.0.1
* babel-loader:                                 ^8.0.0
* babel-plugin-add-module-exports:              ^1.0.0
* babel-plugin-istanbul:                        ^5.1.0
* babel-plugin-react-transform:                 ^3.0.0
* babel-plugin-transform-decorators-legacy:     ^1.3.5
* chai:                                         ^4.2.0
* chai-as-promised:                             ^7.1.1
* chai-enzyme:                                  ^1.0.0-beta.1
* cosmos:                                       ^0.1.2
* coveralls:                                    ^3.0.2
* css-loader:                                   ^1.0.1
* cypress:                                      ^3.1.0
* dateformat:                                   ^3.0.3
* env2:                                         ^2.2.2
* enzyme:                                       ^3.7.0
* es6-plato:                                    ^1.0.18
* eslint:                                       ^5.8.0
* eslint-config-airbnb:                         ^17.1.0
* eslint-import-resolver-webpack:               ^0.10.1
* eslint-plugin-import:                         ^2.14.0
* eslint-plugin-jsx-a11y:                       ^6.1.2
* eslint-plugin-react:                          ^7.11.1
* eslint-watch:                                 ^4.0.2
* eventsource-polyfill:                         ^0.9.6
* exports-loader:                               ^0.7.0
* fast-sass-loader:                             ^1.4.6
* file-loader:                                  ^2.0.0
* flat:                                         ^4.1.0
* git-stats:                                    ^2.10.10
* git-stats-importer:                           ^2.4.9
* gitinspector:                                 ^0.5.0-dev-2
* heapdump:                                     ^0.3.10
* hex-rgba:                                     ^1.0.2
* html-loader:                                  ^0.5.5
* image-webpack-loader:                         ^4.4.0
* javascript-stringify:                         ^1.6.0
* jsondiffpatch:                                ^0.2.4
* jss:                                          ^9.8.7
* jss-nested:                                   ^6.0.1
* jss-vendor-prefixer:                          ^8.0.1
* karma:                                        ^3.1.1
* karma-coverage:                               ^1.1.2
* karma-json-reporter:                          ^1.2.0
* karma-mocha:                                  ^1.0.1
* karma-mocha-reporter:                         ^2.0.0
* karma-phantomjs-launcher:                     ^1.0.2
* karma-spec-reporter:                          0.0.32
* karma-webpack-with-fast-source-maps:          ^1.10.2
* mocha:                                        ^5.2.0
* mocha-lcov-reporter:                          ^1.3.0
* mock-promises:                                ^0.8.2
* node-sass:                                    ^4.9.4
* nodemon:                                      ^1.18.5
* notes:                                        0.0.4
* phantomjs-prebuilt:                           ^2.1.13
* promise-polyfill:                             ^8.1.0
* react-base16-styling:                         ^0.4.1
* react-cosmos:                                 ^4.6.4
* react-draggable:                              ^3.0.5
* react-fastclick:                              ^3.0.2
* react-json-tree:                              ^0.11.0
* redux-usage-report:                           ^1.3.1
* remote-redux-devtools:                        ^0.5.13
* remotedev-app:                                ^0.10.8
* rimraf:                                       ^2.6.2
* selenium-download:                            ^2.0.13
* selenium-standalone:                          ^6.15.3
* sinon:                                        ^7.0.0
* sinon-chai:                                   ^3.2.0
* speed-measure-webpack-plugin:                 ^1.2.3
* url-loader:                                   ^1.1.2
* webpack-cli:                                  ^3.1.2

</p>
</details>

## 1.0.0
**(May 11, 2017)**

### Features

* Established source code layout, structure and primary webpack build tools.
* Designed general form components including generic field builder components that integrate redux-form and Material-UI
* Implement git hooks to automate patch versioning with git pushes to the repository.
* Setup testing framework with continuous integration system Travis to automate, desployment test running and linting on repository pushes.

<details><summary> Core Dependencies (click to see list)</summary>
<p>

* babel-core:                                ^6.21.0
* babel-loader:                              ^6.2.10
* babel-plugin-add-module-exports:           ^0.2.1
* babel-plugin-transform-decorators-legacy:  ^1.3.4
* babel-plugin-transform-react-display-name: ^6.8.0
* babel-plugin-transform-runtime:            ^6.15.0
* babel-polyfill:                            ^6.20.0
* babel-preset-es2015:                       ^6.18.0
* babel-preset-react:                        ^6.16.0
* babel-preset-stage-0:                      ^6.16.0
* babel-register:                            ^6.18.0
* babel-runtime:                             ^6.20.0
* better-npm-run:                            0.0.13
* compression:                               ^1.6.2
* cookie-parser:                             ^1.4.3
* css-loader:                                ^0.26.0
* cssnano:                                   ^3.7.4
* debug:                                     ^2.5.1
* debugger-256:                              ^1.3.6
* express-jwt:                               ^5.1.0
* extract-text-webpack-plugin:               ^1.0.0
* file-loader:                               ^0.9.0
* foundation-sites:                          ^6.2.4
* fs-extra:                                  ^1.0.0
* history:                                   ^3.2.1
* html-webpack-plugin:                       ^2.22.0
* http-proxy:                                ^1.16.2
* humps:                                     ^2.0.0
* imports-loader:                            ^0.6.5
* ip:                                        ^1.1.4
* json-loader:                               ^0.5.4
* jsonwebtoken:                              ^7.2.1
* lodash:                                    ^4.17.2
* material-design-lite:                      ^1.2.1
* material-ui:                               ^0.18.0
* node-sass:                                 ^4.5.2
* node-statsd:                               ^0.1.1
* normalize.css:                             ^5.0.0
* postcss-loader:                            ^1.1.0
* react:                                     ^15.5.4
* react-dom:                                 ^15.5.4
* react-foundation:                          ^0.7.0
* react-icons:                               ^2.2.3
* react-mdl:                                 ^1.10.2
* react-redux:                               ^5.0.4
* react-router:                              ^3.0.0
* react-router-dom:                          ^4.1.1
* react-router-redux:                        ^4.0.8
* react-tap-event-plugin:                    ^2.0.1
* react-transform-catch-errors:              ^1.0.2
* redux:                                     ^3.6.0
* redux-auth:                                0.0.5-beta5
* redux-form:                                ^6.6.3
* redux-form-material-ui:                    ^4.2.0
* redux-orm:                                 ^0.9.0-rc.3
* redux-promise-middleware:                  ^4.2.0
* redux-thunk:                               ^2.2.0
* rethinkdb:                                 ^2.3.3
* rimraf:                                    ^2.5.4
* sass-loader:                               ^4.0.0
* style-loader:                              ^0.13.1
* url-loader:                                ^0.5.6
* webpack:                                   ^1.12.14
* yargs:                                     ^6.3.0

</p>
</details>

<details><summary> Development Dependencies (click to see list)</summary>
<p>

* babel-eslint: ^7.1.0
* babel-plugin-istanbul: ^3.0.0
* babel-plugin-react-transform: ^2.0.2
* babel-plugin-typecheck: ^3.9.0
* chai: ^3.4.1
* chai-as-promised: ^6.0.0
* chai-enzyme: ^0.6.1
* cheerio: ^0.22.0
* codecov: ^1.0.1
* concurrently: ^3.1.0
* connect-history-api-fallback: ^1.3.0
* coveralls: ^2.13.1
* enzyme: ^2.8.2
* eslint: ^3.0.1
* eslint-config-standard: ^6.0.0
* eslint-config-standard-react: ^4.0.0
* eslint-plugin-babel: ^4.0.0
* eslint-plugin-promise: ^3.0.0
* eslint-plugin-react: ^6.0.0
* eslint-plugin-standard: ^2.0.0
* eslint-watch: ^2.1.14
* event-source-polyfill: 0.0.7
* eventsource-polyfill: ^0.9.6
* express: ^4.14.0
* happypack: ^3.0.2
* heapdump: ^0.3.7
* inject-loader: ^3.0.0
* karma: ^1.0.0
* karma-coverage: ^1.0.0
* karma-json-reporter: ^1.2.0
* karma-mocha: ^1.0.1
* karma-mocha-reporter: ^2.0.0
* karma-phantomjs-launcher: ^1.0.2
* karma-spec-reporter: 0.0.26
* karma-webpack-with-fast-source-maps: ^1.9.2
* memwatch-next: ^0.3.0
* mocha: ^3.0.1
* mocha-lcov-reporter: ^1.3.0
* morgan: ^1.7.0
* nodemon: ^1.10.2
* phantomjs-prebuilt: ^2.1.13
* plato: ^1.7.0
* react-addons-test-utils: ^15.0.0
* react-test-renderer: ^15.5.4
* react-transform-catch-errors: ^1.0.2
* redbox-react: ^1.2.10
* redux-logger: ^2.7.4
* redux-mock-store: ^1.2.3
* sinon: ^1.17.5
* sinon-chai: ^2.8.0
* stats-webpack-plugin: ^0.4.2
* webpack-dev-middleware: ^1.6.1
* webpack-hmr: ^1.0.2
* webpack-hot-middleware: ^2.12.2

</p>
</details>

## [TODO]
<details><summary> Outstanding tasks... (click to see more)</summary>
<p>

* Create ROADMAP.md for broad goals/brainstorming, get "Outstanding tasks" itemized and implemented with github issues
* Use hexo and follow cypress-documentation method for autogenerating split (by minor version) changelog entries
* Create minor/major version bumper script that autopopulates new changelog snippet with entries from current trunk.
* Bumper script should also auto generate plato reports and track basic stats like # of patches, # of commits, sloc, test coverage, etc. (include in changelog as a "Stats" section accordion).
* Consolidate API configuration with client configuration, fold into common module.
* Automate dependency diffing on minor/major bump
* Create script to autodiff package.json on major/minor version bumps and create table with the following layout in the changelog (accordiong functionality)

| Type  | Package Name                       | Version  |
|:-----:| ---------------------------------- |:--------:|
|   U   | @babel/core                        |  ^7.0.0  |

</p>
</details>
