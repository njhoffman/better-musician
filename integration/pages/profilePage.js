const profileCommands = { };

export default {
  url: 'http://localhost:3000/profile',
  commands: [profileCommands],
  elements: {
    songList: {
      selector: '.songsView table'
    }
  }
};
