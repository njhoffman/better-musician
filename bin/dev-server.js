require('../server/server.babel'); // babel registration (runtime transpilation for node)

const config = require('../config/');
const server = require('../server');
const { info } = require('../shared/logger')('app:dev-server');

server.listen(config.server.port);
info(`Server is now running at http://${config.server.host}:${config.server.port}.`);
info(`Proxy connected to API at http://${config.api.host}:${config.api.port}`);
