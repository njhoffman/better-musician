const project = require('../config/project.config');
const server = require('../server/main');
const debug = require('debug')('app:bin:dev-server');

// server.listen(project.server_port, project.server_host);
server.listen(project.server_port);
debug(`Server is now running at http://${project.server_host}:${project.server_port}.`);
debug(`Proxy connected to API at http://localhost:3001.`);
