require('../server/server.babel'); // babel registration (runtime transpilation for node)

const project = require('../config/project.config');
const server = require('../server');
const { log } = require('debugger-256')('app:bin:dev-server');

server.listen(project.server_port);
log(`Server is now running at http://${project.server_host}:${project.server_port}.`);
log(`Proxy connected to API at http://${project.api_host}:${project.api_port}`);
