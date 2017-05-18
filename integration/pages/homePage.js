const homeCommands = { };

export default {
  url: 'http://localhost:3000/songs',
  commands: [homeCommands],
  elements: {
    songList: {
      selector: '.songsView table'
    }
  }
};
