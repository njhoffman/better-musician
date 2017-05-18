const statCommands = { };

export default {
  url: 'http://localhost:3000/state',
  commands: [statCommands],
  elements: {
    songList: {
      selector: '.songsView table'
    }
  }
};
