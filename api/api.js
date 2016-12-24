import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import config from '../src/config';
import http from 'http';
// import SocketIo from 'socket.io';
// import { createSequelize, User } from './models/index';
// import passport from 'passport';
import morgan from 'morgan';
// import connectSessionSequelize from 'connect-session-sequelize';
// import configPassport from './utils/passportConfig';
// import passportRoutes from './utils/passportRoutes';

// var SequelizeStore = connectSessionSequelize(session.Store);

import writeMorgan from '../server.morgan.js';

const debug = require('debug')('api:');

debug("initializing api proxy server");
const app = express();

const server = new http.Server(app);

//const io = new SocketIo(server);
//io.path('/ws');

// app.locals.sequelize = createSequelize();

app.use(session({
  secret: 'somesecret',
  // store: new SequelizeStore({ db: app.locals.sequelize }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());
app.use(morgan(writeMorgan('api:request')));
// app.use(passport.initialize());
// app.use(passport.session());
// configPassport(passport);
// passportRoutes(app, passport);

app.get('/test', (req, res) => {
    debug("testing");
    res.json(
      {
        status: 'ok'
      });
  }
);


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

const runnable = app.listen(4000, (err) => {
  if (err) {
    console.error(err);
  }
  debug('API is running on port %s', '4000');
  debug('Send requests to http://%s:%s', 'localhost', '4000');
});

/*
  *
  * HU: Disabling socket.io server for now
  *
io.on('connection', (socket) => {
  socket.emit('news', {msg: `'Hello World!' from server`});

  socket.on('history', () => {
    for (let index = 0; index < bufferSize; index++) {
      const msgNo = (messageIndex + index) % bufferSize;
      const msg = messageBuffer[msgNo];
      if (msg) {
        socket.emit('msg', msg);
      }
    }
  });

  socket.on('msg', (data) => {
    data.id = messageIndex;
    messageBuffer[messageIndex % bufferSize] = data;
    messageIndex++;
    io.emit('msg', data);
  });
});
io.listen(runnable);
*/

