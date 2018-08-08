/* eslint-disable no-console */
export default {
  after : (client) => {
    if (client.globals.env && client.globals.env === 'local') {
      console.log('Local teardown, leaving session open...');
      // client.closeWindow();
    } else {
      console.log('Remote teardown, closing session...');
      client.end();
    }
  },
  waitForConditionTimeout: 10000
};
/* eslint-enable no-console */
