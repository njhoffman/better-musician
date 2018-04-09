const { imgpath } = require('../../nightwatch.conf.js');
export default {

  'Can navigate to': (client) => {
    const loginPage = client.page.loginPage();

    loginPage.navigate().expect.element('@emailInput').to.be.present;
    client.saveScreenshot(imgpath(client, 'Login View'));
  },

  'Login failure': (client) => {
    const loginPage = client.page.loginPage();
    // const songsPage = client.page.songsPage();

    loginPage.navigate().login('badname', 'badpassword');
    loginPage.expect.element('@errorMessage').to.be.present;
    client.saveScreenshot(imgpath(client, 'Failed Login'));
  },

  'Login success': (client) => {
    const loginPage = client.page.loginPage();
    const songsPage = client.page.songsPage();

    loginPage.navigate().login('testuser@example.com', 'shouldntmatter');

    songsPage.expect.element('@songList').to.be.present;
    // expect drawer menu changed, header changed, footer changed
    client.saveScreenshot(imgpath(client, 'Successful Login'));
  }
};
