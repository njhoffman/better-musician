const { imgpath } = require('../../nightwatch.conf.js');
export default {
  'Can navigate to': (client) => {
    const loginPage = client.page.loginPage();
    const songsPage = client.page.songsPage();

    loginPage.navigate().login('testuser@example.com', 'shouldntmatter');
    songsPage.expect.element('@songList').to.be.present;
    client.saveScreenshot(imgpath(client, 'Songs View'));
  }
  // can open edit song, view song, select song shows footer, pagination works
  // need a testGlobalAuth, testGlobalNoAuth
};
