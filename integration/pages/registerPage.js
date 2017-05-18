const registerCommands = { };

export default {
  url: 'http://localhost:3000/register',
  commands: [registerCommands],
  elements: {
    songList: {
      selector: '.songsView table'
    }
  }
};
