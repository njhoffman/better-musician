// debug output configuration
// TODO: make this overwritten by DEBUG=* environment variable
// nested subsystems delineated by :'s (app:routes:admin)
// set as single number for log level, two numbers comma separated to indicate object logging depth

module.exports = {
  'app' : {
    '*' : 2,
    'response' : 3,
    'request' : 3
  }
};
