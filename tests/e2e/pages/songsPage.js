const songCommands = { };

export default {
  url: 'http://localhost:3000/songs',
  commands: [songCommands],
  elements: {
    songList: {
      selector: '.songsView table'
    }
  }
};
