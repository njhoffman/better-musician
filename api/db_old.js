// const debug = require("debug")("api:db");
const debug = console.log;

function initDB() {
  const r = require('rethinkdb')
  const dbOptions = { host: 'localhost', port: 28015 }

  return r.connect(dbOptions)
    .then(conn => {
      debug('connected');
      const db = r.db('test');

      return db.tableList().run(conn)
        .then(tables => {
          if (tables.indexOf('state') !== -1) {
            debug('deleting existing table state');
            return db.tableDrop('state').run(conn);
          }
        })
        .then(() => {
          return db.tableCreate('state').run(conn)
            .then(() => debug('created state table'));
        })
        .then(() => {
          debug('returning db objects');
          return {
            r: r,
            conn: conn,
            db: db,
            table: r.db('test').table('state')
          };
        });
    })
    .then(info => {
      debug('got info', Object.keys(info))
      return info;
    });
}

function counter(rethinkState, action) {
  if (!action) {
    debug('setting the default state')
    return rethinkState.table.insert({
      id: 1,
      state: 0
    }).run(rethinkState.conn).then(() => rethinkState)
  }

  switch (action.type) {
  case 'INCREMENT':
    debug('incrementing value')
    return rethinkState
        .table
        .get(1)
        .update({ state: rethinkState.r.row('state')
          .add(1)
        })
        .run(rethinkState.conn)
        .then(() => rethinkState);
  case 'DECREMENT':
    debug('decrementing')
      return rethinkState
        .table
        .get(1)
        .update({
          state: rethinkState.r
          .row('state')
          .add(-1)
        })
        .run(rethinkState.conn)
        .then(() => rethinkState);
  default:
    return rethinkState;
  }
}

initDB()
  .then(function subscribe(state) {
    return state
      .table
      .get(1)
      .changes()
      .run(state.conn)
      .then(cursor => {
        cursor.each((err, change) => debug(change.new_val.state))
      })
      .then(() => state)
  })
  .then(counter)
  .then(rethinkState => counter(rethinkState, { type: 'INCREMENT' }))
  .then(rethinkState => counter(rethinkState, { type: 'INCREMENT' }))
  .then(rethinkState => counter(rethinkState, { type: 'DECREMENT' }))
  .done()
